ko.bindingHandlers.autoComplete = {
    findSelectedItem: function (dataSource, binding, selectedValue){
        var unwrap = ko.utils.unwrapObservable;
        //Go through the source and find the id, and use its label to set the autocomplete
        var source = unwrap(dataSource);
        var valueProp = unwrap(binding.optionsValue);

        var selectedItem = ko.utils.arrayFirst(source, function (item){
            if (unwrap(item[valueProp]) === selectedValue)
                return true;
        }, this);

        return selectedItem;
    },
    buildDataSource: function (dataSource, labelProp, valueProp, populateOptions){
        var unwrap = ko.utils.unwrapObservable;
        var source = unwrap(dataSource);
        var mapped = ko.utils.arrayMap(source, function (item) {
            var result = {},
				mainLabel = labelProp ? unwrap(item[labelProp]) : unwrap(item).toString();
			if(populateOptions && populateOptions.length){
				var subLeftLabel = (populateOptions[0]) ? unwrap(item[populateOptions[0].optionText]) : undefined,
					subRightLabel = (populateOptions[1]) ? unwrap(item[populateOptions[1].optionText]) : undefined;				
			}
			var labelText = '<div class="label-text"><p class="main">'+mainLabel+'</p>';
			(subLeftLabel) && (labelText += '<p class="sub-left">'+subLeftLabel+'</p>');
			(subRightLabel) && (labelText += '<p class="sub-right">'+subRightLabel+'</p>');
			labelText += "</div>";
            result.label = labelText;  //show in pop-up choices
            result.value = valueProp ? unwrap(item[valueProp]) : unwrap(item).toString();  //value 
            return result;
        });
        return mapped;
    },
    init: function (element, valueAccessor, allBindingsAccessor, viewModel){
        var unwrap = ko.utils.unwrapObservable,
			dataSource = valueAccessor(),
			binding = allBindingsAccessor(),
			valueProp = unwrap(binding.optionsValue),
			labelProp = unwrap(binding.optionsText) || valueProp,
			displayId = $(element).attr('id') + '-display',
			displayElement,
			options = (binding.autoCompleteOptions) ? $.extend(options, binding.autoCompleteOptions) : {},
			populateOptions = (binding.populateOptions && binding.populateOptions.length) ? binding.populateOptions : [];

        //Create a new input to be the autocomplete so that the label shows
        // also hide the original control since it will be used for the value binding
        $(element).hide();
        $(element).after('<input type="text" id="' + displayId + '" />')
        displayElement = $('#' + displayId);
		displayElement.attr('placeholder', $(element).attr('placeholder'));

        //handle value changing
        var modelValue = binding.value;
        if (modelValue) {
			var populateInputs = function(ui){
				var label = $(ui.item.label).find('p.main').text();
				$(displayElement).val(label);
			};
			
            var handleValueChange = function (event, ui) {
                var labelToWrite = ui.item ? ui.item.label : null
                var valueToWrite = ui.item ? ui.item.value : null;
				
                //The Label and Value should not be null, if it is
                // then they did not make a selection so do not update the 
                // ko model
                if (labelToWrite && valueToWrite) {
                    if (ko.isWriteableObservable(modelValue)) {
                        //Since this is an observable, the update part will fire and select the 
                        //  appropriate display values in the controls
                        modelValue(valueToWrite);
                    } else {  //write to non-observable
                        if (binding['_ko_property_writers'] && binding['_ko_property_writers']['value']) {
                            binding['_ko_property_writers']['value'](valueToWrite);
                            //Because this is not an observable, we have to manually change the controls values
                            // since update will not do it for us (it will not fire since it is not observable)
                            displayElement.val(labelToWrite);
                            $(element).val(valueToWrite);
                        }
                    }
                }
                //They did not make a valid selection so change the autoComplete box back to the previous selection
                else {
                    var currentModelValue = unwrap(modelValue);
                    //If the currentModelValue exists and is not nothing, then find out the display
                    // otherwise just blank it out since it is an invalid value
                    if (!currentModelValue)
                        displayElement.val('');
                    else {
                        //Go through the source and find the id, and use its label to set the autocomplete
                        var selectedItem = ko.bindingHandlers.autoComplete.findSelectedItem(dataSource, binding, currentModelValue);           

						//If we found the item then update the display
                        if (selectedItem) {
                            var displayText = labelProp ? unwrap(selectedItem[labelProp]) : unwrap(selectedItem).toString();
                            displayElement.val(displayText);
                        }
                        //if we did not find the item, then just blank it out, because it is an invalid value
                        else {
                            displayElement.val('');
                        }
                    }
                }

                return false;
            };

            var handleFocus = function (event, ui) {				
                populateInputs(ui);				
                return false;
            };

            options.change = handleValueChange;
            options.select = handleValueChange;
            options.focus = handleFocus;
            //options.close = handleValueChange;
        }

        //handle the choices being updated in a Dependant Observable (DO), so the update function doesn't 
        // have to do it each time the value is updated. Since we are passing the dataSource in DO, if it is
        // an observable, when you change the dataSource, the dependentObservable will be re-evaluated
        // and its subscribe event will fire allowing us to update the autocomplete datasource
        var mappedSource = ko.dependentObservable(function () {
            return ko.bindingHandlers.autoComplete.buildDataSource(dataSource, labelProp, valueProp, populateOptions);
        }, viewModel);
        //Subscribe to the knockout observable array to get new/remove items
        mappedSource.subscribe(function (newValue) {
            displayElement.autocomplete("option", "source", newValue);
        });

        options.source = mappedSource();

        displayElement.autocomplete(options);
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel){
        //update value based on a model change
        var unwrap = ko.utils.unwrapObservable,
			dataSource = valueAccessor(),
			binding = allBindingsAccessor(),
			valueProp = unwrap(binding.optionsValue),
			labelProp = unwrap(binding.optionsText) || valueProp,
			displayId = $(element).attr('id') + '-display',
			displayElement = $('#' + displayId),
			modelValue = binding.value,
			options = (binding.autoCompleteOptions),
			populateOptions = (binding.populateOptions && binding.populateOptions.length) ? binding.populateOptions : [];

        if (modelValue) {
            var currentModelValue = unwrap(modelValue);
            //Set the hidden box to be the same as the viewModels Bound property
            $(element).val(currentModelValue);
            //Go through the source and find the id, and use its label to set the autocomplete
            var selectedItem = ko.bindingHandlers.autoComplete.findSelectedItem(dataSource, binding, currentModelValue);
            if (selectedItem) {
                var displayText = labelProp ? unwrap(selectedItem[labelProp]) : unwrap(selectedItem).toString();
                displayElement.val(displayText);
				for (var po=0, poLen=populateOptions.length; po<poLen; po++){
					$('#'+populateOptions[po].inputId+'-display').val(selectedItem[populateOptions[po].optionText]);
					if (options.model){
						var optionArr = options.model.split('.');
						
						if (optionArr.length == 1){
							viewModel[optionArr[0]][populateOptions[po].optionId](selectedItem[populateOptions[po].optionId]);
						}else if (optionArr.length == 2){
							viewModel[optionArr[0]][optionArr[1]][populateOptions[po].optionId](selectedItem[populateOptions[po].optionId]);
						}else if (optionArr.length == 3){
							viewModel[optionArr[0]][optionArr[1]][optionArr[2]][populateOptions[po].optionId](selectedItem[populateOptions[po].optionId]);
						}else if (optionArr.length == 4){
							viewModel[optionArr[0]][optionArr[1]][optionArr[2]][optionArr[3]][populateOptions[po].optionId](selectedItem[populateOptions[po].optionId]);
						}						
					}else{
						viewModel[populateOptions[po].optionId](selectedItem[populateOptions[po].optionText]);
					}
				}
            }
        }
    }
};

ko.bindingHandlers.autoCompleteValue = {
	init: function (element, valueAccessor, allBindingsAccessor, viewModel){
		var displayId = $(element).attr('id') + '-display';
		
		$(element).hide();
        $(element).after('<input type="text" id="' + displayId + '" />');
		$('#' + displayId).attr({'disabled' : 'disabled', 'placeholder' : $(element).attr('placeholder')});
        displayElement = $('#' + displayId);
	},
	update: function (element, valueAccessor, allBindingsAccessor, viewModel){
		
	}
}

$.ui.autocomplete.prototype._renderItem = function( ul, item ) {
	return $( "<li>" ).html( item.label ).appendTo( ul );
}