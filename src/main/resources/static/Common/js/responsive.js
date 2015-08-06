var RSSB = RSSB || {};

;(function($, window, document, RSSB, undefined){
	RSSB.reusables = (function(){
		function _reusables(){
			var context = this;
			
			this.init = function(){
				headerMenu.init();
				tabAccordion.init();
				cstmForm.init();
				cstmOverlay.init();
				notifier.init();
			};
			
			this.load = function(){
				responsiveTable.load();
			};
			
			this.bodyClicks = function(){
				headerMenu.bodyClicks();
				cstmOverlay.bodyClick();
			};
			
			this.resize = function(){
				tabAccordion.resize();
				responsiveTable.resize();
				cstmForm.resize();
				cstmOverlay.resize();
			};
			
			this.showLoader = function(val){
				setTimeout(function(){
					cstmOverlay.showLoading(val);
				}, 1);
			}
			
			this.notify = function(type, msg, alertFlag){
				notifier.notify(type, msg, alertFlag);
			};
			
			this.validateForm = function($wrapper){
				return cstmForm.validateForm($wrapper);
			}

			var headerMenu = (function(){
				function _headerMenu(){
					var that = this;
					
					this.init = function(){
						attachEvents();
					};
					
					this.bodyClicks = function(){
						var $body = $('body'),
							$bottomSection = $('div.bottom-section'); 
							
						if ($bottomSection.hasClass('open-menu')){
							$bottomSection.removeClass('open-menu');
							$body.removeClass('mobile-display');
							setTimeout(function(){$body.removeClass('mobile-fixed');}, 510);
						}
					};
					
					var attachEvents = function(){
						$(document).delegate('a.mobile-menu', 'click', function(evt){
							evt.preventDefault();
							evt.stopPropagation();
							
							var $body = $('body'),
								$bottomSection = $('div.bottom-section');
							
							if ($body.hasClass('mobile-display')){
								$bottomSection.removeClass('open-menu');
								$body.removeClass('mobile-display');
								setTimeout(function(){$body.removeClass('mobile-fixed');}, 510);
							}else{								
								$body.addClass('mobile-fixed mobile-display');
								$bottomSection.addClass('open-menu');
							}							
						});
						
						$(document).delegate('a.main-menu-link, div.account-links a', 'click', function(evt){
							var $body = $('body');
							$('div.bottom-section').removeClass('open-menu');
							$body.removeClass('mobile-display');
							setTimeout(function(){$body.removeClass('mobile-fixed');}, 510);
						});
					};
				
					return this;
				};
				
				return new _headerMenu();
			}());

			var tabAccordion = (function(){
				function _tabAccordion(){
					var that = this,
						prevWidth = 0;
					
					this.init = function(){
						that.initTabAccordion();
						attachEvents();
					};
					
					this.resize = function(){
						that.initTabAccordion();
					};
					
					this.initTabAccordion = function(){
						var vpWidth = $(window).width();
							$defaultTab = $('.tab-wrap .tab-elem[data-default-tab]'),
							$defaultAccTab = $('.mobile-accordion-tab[data-default-accordion]'),
							$activeTab = $('.tab-wrap .tab-elem.active-tab'),
							$activeAccordion = $('.mobile-accordion-tab.active-tab');
						
						prevWidth = vpWidth;
						
						if (vpWidth > 570){
							if (prevWidth < 570 && $activeAccordion.length > 0){
								var tabName = $activeAccordion.data('tab'),
									$activeTabLink = $('.tab-nav-bar .tab-link[data-tab='+tabName+']');
								
								$('.tab-nav-bar .tab-link.active-tab').removeClass('active-tab');
								(!$activeTabLink.hasClass('active-tab')) && $activeTabLink.addClass('active-tab');
							}else if($activeTab.length > 0){								
								
							}else{
								$('.tab-wrap .tab-elem').addClass('hidden');
								$defaultTab.removeClass('hidden').addClass('active-tab');
							}
						}else if (vpWidth <= 570){
							if (prevWidth > 570 && $activeTab.length > 0){
								$('.mobile-accordion-link.active').removeClass('active');
								$activeAccLink = $activeTab.prev('.mobile-accordion-link').addClass('active');
							}else{
								$defaultAccTab.removeClass('hidden').addClass('active-tab');
							}
						}
					};
					
					var attachEvents = function(){
						$(document).delegate('.tab-nav-bar .tab-link', 'click', function(evt){
							evt.preventDefault();
							if ($(document).width() > 570){
								var $reqTabLink = $(this),
									reqTabClass = $reqTabLink.attr('data-tab'),
									$activeTabLink = $('.tab-link.active-tab');
									$reqTab = $('.tab-wrap .'+reqTabClass+'[data-tab="'+reqTabClass+'"]'),
									$activeTab = $('.tab-wrap .tab-elem.active-tab');
								
								if (!$reqTabLink.hasClass('active-tab')){
									// hiding active tab.
									$activeTabLink.removeClass('active-tab');
									$activeTab.removeClass('active-tab');
									$activeTab.addClass('hide-tab');
									setTimeout(function(){
										$activeTab.addClass('hidden');
										
									// showing new tab.
										$reqTab.addClass('active-tab');			
										$reqTab.removeClass('hidden')
										setTimeout(function(){$reqTab.removeClass('hide-tab');}, 1)
									}, 501);
									$reqTabLink.addClass('active-tab');			
								}
							}
						});

						$(document).delegate('a.mobile-accordion-link', 'click', function(evt){
							evt.preventDefault();
							
							
								var $this = $(this),
									$activeLink = $('a.mobile-accordion-link.active'),
									$reqTab = $this.next(),
									$currentTab = $('.mobile-accordion-tab.active-tab');
									
							if ($this.hasClass('active')){
								$this.removeClass('active');
								$currentTab.removeClass('active-tab');
								setTimeout(function(){
									$currentTab.addClass('hidden');
								}, 501)
							}else{
								$activeLink.removeClass('active');
								$this.addClass('active');
								
								$currentTab.removeClass('active-tab');
								setTimeout(function(){
									$currentTab.addClass('hidden');
									$reqTab.removeClass('hidden')
									setTimeout(function(){$reqTab.addClass('active-tab');}, 1);
								}, 501)
							}		
						});
					};
					
					return this;
				};
				
				return new _tabAccordion();
			}());			

			var responsiveTable = (function(){
				function _responsiveTable(){
					var that = this;
	
					this.load = function(){
						that.initResponsiveTable();
						attachEvents();
					};
					
					this.resize = function(){
						that.initResponsiveTable();
					};
					var attachEvents = function(){
						$(document).delegate('.responsive-table-wrap td.expand', 'click', function(evt){
							var $this = $(this),
								$parentTr = $this.parents('tr');
							
							if ($parentTr.hasClass('has-hiddenrow')){
								$parentTr.next('tr.hidden-fields-row').removeClass('hidden');
							}else{
								var hiddenTdArr = $parentTr.find('td.hidden'),
									hiddenThArr = $this.parents('table').find('th.hidden'),
									colSpan = $('table th').not('table th.hidden').length
									$mobileHiddenDetailsWrap = $('<tr class="hidden-fields-row"><td colspan="'+colSpan+'"><ul></ul></td></tr>'),
									$sampleLi = $('<li class="mobile-list"><span class="property"></span> : <span class="value"></span></li>');
								
								if (hiddenTdArr.length === hiddenThArr.length){
									for (var i=0, len=hiddenTdArr.length; i<len; i++){
										var $liClone = $sampleLi.clone();
										$liClone.find('span.property').text($(hiddenThArr[i]).text());
										$liClone.find('span.value').text($(hiddenTdArr[i]).text());
										
										$mobileHiddenDetailsWrap.find('ul').append($liClone);
									}
								}
								
								$parentTr.addClass('has-hiddenrow');
								$parentTr.after($mobileHiddenDetailsWrap);		
							}
							$parentTr.find('td.expand').removeClass('expand').addClass('collapse');
						});

						$(document).delegate('.responsive-table-wrap td.collapse', 'click', function(evt){
							var $parentTr = $(this).parents('tr');
								
							$parentTr.next('tr.hidden-fields-row').addClass('hidden');
							$parentTr.find('td.collapse').removeClass('collapse').addClass('expand');
						});
					};
					
					this.initResponsiveTable = function(){
						var responsiveTableArr = $('.responsive-table-wrap table.responsive');		
								
						for (var i=0, l=responsiveTableArr.length; i<l; i++){
							var $respTable = $(responsiveTableArr[i]),
								$respTableWrap = $respTable.parents('.responsive-table-wrap'),
								$pinnedTableWrap = $respTableWrap.find('.pinned-wrap'),
								wrapperWidth = $respTableWrap.width(),
								tableWidth = $respTable.width(),
								viewportWidth = $(window).width();
								
								if (viewportWidth >= 768){
									if ($respTableWrap.hasClass('mobile-table') || wrapperWidth < tableWidth){
										if($respTableWrap.hasClass('mobile-table')){		
											$respTable.find('th.hidden').removeClass('hidden');
											$respTable.find('td.hidden').removeClass('hidden');
											$respTable.find('td:first-child').removeClass('expand').removeClass('collapse');		
											$respTable.find('tr.hidden-fields-row').addClass('hidden');
											$respTableWrap.removeClass('mobile-table');		
										}
										(!$respTableWrap.hasClass('scrollable-table')) ? generateRespTable($respTable) : ($pinnedTableWrap[0] && $pinnedTableWrap.length > 0 && $pinnedTableWrap.removeClass('hidden'));
									}else {
										$pinnedTableWrap[0] && $pinnedTableWrap.length > 0 && $pinnedTableWrap.addClass('hidden');
									}
								}else if(viewportWidth < 768){
									generateMobileTable($respTable);
								}
						}
					}

					var generateRespTable = function($respTable){
						var $respTableWrap = $respTable.parents('.responsive-table-wrap'),
							$tableHead = $respTable.find('th:first-child'),
							$thClone = $tableHead.clone(),
							$pinnedTableWrap = $respTableWrap.find('.pinned-wrap'),
							tableFirstColArr = $respTable.find('tr:not(.hidden-fields-row) td:first-child'),            
							tableBody = "";
						
						if($pinnedTableWrap.length > 0 && $pinnedTableWrap.hasClass('hidden')){
							$pinnedTableWrap.removeClass('hidden');
							return;
						}
						
						for(var j=0, len=tableFirstColArr.length; j<len; j++){
							var $currentTd = $(tableFirstColArr[j]),
								$cloneTd = $currentTd.clone(),
								tdHeight = $currentTd.css('height');
								
							$cloneTd.css('height',tdHeight);
							tableBody +='<tr>'+$('<div>').append($cloneTd).html()+'</tr>';
						}
						$thClone.css('height',$tableHead.css('height'));
						var tableStr = '<div class="pinned-wrap"><table class="pinned" cellpadding="0" cellspacing="0" border="1px" style="width:'+$tableHead.css('width')+';"><thead><tr>'+$('<div>').html($thClone).html()+'</tr></thead><tbody>'+tableBody+'</tbody></table></div>',
							$tableStr = $(tableStr);
						
						$tableStr.find('tr:nth-child(2n)').addClass('even');
						$tableStr.find('tr:nth-child(2n+1)').addClass('odd');
						$respTable.wrap('<div class="scrollable">').parent().parent().append($tableStr);
						$respTable.parents('.responsive-table-wrap').addClass('scrollable-table');
					}

					var generateMobileTable = function($respTable){
						var $respTableWrap = $respTable.parents('.responsive-table-wrap'),
							vpWidth = $(window).width(),
							thArr = $respTable.find('th'),
							tbodyArr = $respTable.find('tbody tr:not(.hidden-fields-row)');
							
						$respTable.find('th.hidden').addClass('invisible').removeClass('hidden');
						$respTable.find('td.hidden').addClass('invisible').removeClass('hidden');
						
						for(var i=0, l=thArr.length; i<l; i++){
							var $th = $(thArr[i]),
								thLeft = (i === l-1) ? $(thArr[i]).offset().left : $(thArr[i+1]).offset().left;
								
							if (thLeft > vpWidth){
								$th.addClass('invisible');
							}else{
								$th.hasClass('invisible') && $th.removeClass('invisible');
								$th.hasClass('hidden') && $th.removeClass('hidden');
							}
						}
							
						for(var j=0, len=tbodyArr.length; j<len; j++){
							var $currentTr = $(tbodyArr[j]),
								tdArr = $currentTr.find('td'),
								$hiddenTr = $currentTr.next('tr.hidden-fields-row'),
								colSpan = $('table th').not('table th.hidden').length;
								
							for(var i=0, l=tdArr.length; i<l; i++){
								var $td = $(tdArr[i]),			
									tdLeft = (i === l-1) ? $(tdArr[i]).offset().left : $(tdArr[i+1]).offset().left,
									tdWidth = $td.width(),
									totalTdWidth = tdLeft + tdWidth;
								
								if (tdLeft > vpWidth){
									if ((!$td.hasClass('invisible')) && $hiddenTr[0] && $hiddenTr.length > 0 && $hiddenTr.find('li.mobile-list:contains('+$(thArr[$td.index()]).text()+')').length === 0){
										var $sampleLi = $('<li class="mobile-list"><span class="property"></span> : <span class="value"></span></li>'),
											$hiddenRow = $hiddenTr.find('ul'),
											index = $td.index();
										
										$sampleLi.find('span.value').text($td.text());
										$sampleLi.find('span.property').text($(thArr[index]).text());
										
										$hiddenRow.append($sampleLi);
									}
									$td.addClass('invisible');
								}else{
									if ($td.hasClass('invisible')){
										var index = $td.index(),
											thisHeadText = $(thArr[index]).text(),
											$listDetails = $hiddenTr.find('li.mobile-list:contains('+thisHeadText+')');
											
										$td.removeClass('invisible');
										$listDetails.remove();
									}				
								}
								$hiddenTr.find('td').attr('colspan', colSpan);
							}
						}
						
						
						$respTable.find('th.invisible').addClass('hidden').removeClass('invisible');
						$respTable.find('td.invisible').addClass('hidden').removeClass('invisible');
						$respTable.find('tr:not(.hidden-fields-row) td:first-child').addClass('expand');
						
						if($respTableWrap.hasClass('scrollable-table')){
							$respTableWrap.addClass('mobile-table');
							$respTableWrap.find('div.pinned-wrap').addClass('hidden');
						}else{
							$respTableWrap.addClass('mobile-table');
						}
						
					}
		
					return this;
				};
				
				return new _responsiveTable();
			}());

			var cstmForm = (function(){
				function _cstmForm(){
					var that = this,
						errorRepo = {
							required : "This field is mandatory",
							regex : "Please verify your input",
							minlength : "The input entered is too short",
							maxlength : "The input entered is too long",
							validemail : "Please enter valid email id",
							validname : "Please enter valid input",
							validdate : "Please enter valid date",
							general : "Please check your input."
						};
					
					this.init = function(){
						that.initCstmForm();
						attachEvents();
					};
					
					this.resize = function(){
						//initOddEven();
					};
					
					this.initCstmForm = function(){						
						//fieldset ul.form-fields-wrap li .radio-group-wrap.qty-3 label{width: 33.3333%;} // Set cstm radio label width based on total radio buttons.
						//initOddEven();
					};
					
					var attachEvents = function(){
						$(document).delegate('.radio-group-wrap label, .radio-group-wrap input[type=radio]', 'click', function(evt){
							setTimeout(function(){
								var $this = $(evt.target),
									$activeRadio = $this.parents('.radio-group-wrap').find('input[type=radio]:checked');
								if ($activeRadio.length === 0){
									return;
								}else{
									var totalRadio = $this.parents('.radio-group-wrap').find('input[type=radio]').length,
										reqWidth = (100/totalRadio)*($activeRadio.index()/2),
										$activeRadioOverlay = $this.parents('.radio-group-wrap').find('a.active-radio');
								
									$activeRadioOverlay.css('left', reqWidth+'%');
								}
							}, 1);
						});
					};
					
					var initOddEven = function(){
						// alternate coloring odd and even rows.
						var $fieldset = $('fieldset.resp-form').not('fieldset.resp-form.no-color'),
							vpWidth = document.documentElement.clientWidth,
							fieldsetLen = $fieldset.length;
						
						for(var i=0; i<fieldsetLen; i++){
							var $currentFieldset = $($fieldset[i]);
							$currentFieldset.find('ul.form-fields-wrap li').removeClass('odd').removeClass('even');
							if (vpWidth >= 768){
								$currentFieldset.hasClass('col-5') && $currentFieldset.find('ul.form-fields-wrap > li:nth-child(10n+1), ul.form-fields-wrap > li:nth-child(10n+2), ul.form-fields-wrap > li:nth-child(10n+3), ul.form-fields-wrap > li:nth-child(10n+4), ul.form-fields-wrap > li:nth-child(10n+5)').addClass('odd');
								$currentFieldset.hasClass('col-5') && $currentFieldset.find('ul.form-fields-wrap > li:nth-child(10n), ul.form-fields-wrap > li:nth-child(10n+6), ul.form-fields-wrap > li:nth-child(10n+7), ul.form-fields-wrap > li:nth-child(10n+8), ul.form-fields-wrap > li:nth-child(10n+9)').addClass('even');
																
								$currentFieldset.hasClass('col-4') && $currentFieldset.find('ul.form-fields-wrap > li:nth-child(8n+1), ul.form-fields-wrap > li:nth-child(8n+2), ul.form-fields-wrap > li:nth-child(8n+3), ul.form-fields-wrap > li:nth-child(8n+4)').addClass('odd');
								$currentFieldset.hasClass('col-4') && $currentFieldset.find('ul.form-fields-wrap > li:nth-child(8n), ul.form-fields-wrap > li:nth-child(8n+5), ul.form-fields-wrap > li:nth-child(8n+6), ul.form-fields-wrap > li:nth-child(8n+7)').addClass('even');
								
								$currentFieldset.hasClass('col-3') && $currentFieldset.find('ul.form-fields-wrap > li:nth-child(6n+1), ul.form-fields-wrap > li:nth-child(6n+2), ul.form-fields-wrap > li:nth-child(6n+3)').addClass('odd');
								$currentFieldset.hasClass('col-3') && $currentFieldset.find('ul.form-fields-wrap > li:nth-child(6n), ul.form-fields-wrap > li:nth-child(6n+4), ul.form-fields-wrap > li:nth-child(6n+5)').addClass('even');
								
								$currentFieldset.hasClass('col-2') && $currentFieldset.find('ul.form-fields-wrap > li:nth-child(4n+1), ul.form-fields-wrap > li:nth-child(4n+2)').addClass('odd');
								$currentFieldset.hasClass('col-2') && $currentFieldset.find('ul.form-fields-wrap > li:nth-child(4n), ul.form-fields-wrap > li:nth-child(4n+3)').addClass('even')	
							}else if (vpWidth >= 570){
								($currentFieldset.hasClass('col-3') || $currentFieldset.hasClass('col-2')) && $currentFieldset.find('ul.form-fields-wrap > li:nth-child(4n+1), ul.form-fields-wrap > li:nth-child(4n+2)').addClass('odd');
								($currentFieldset.hasClass('col-3') || $currentFieldset.hasClass('col-2')) && $currentFieldset.find('ul.form-fields-wrap > li:nth-child(4n), ul.form-fields-wrap > li:nth-child(4n+3)').addClass('even');
							}else{
								($currentFieldset.hasClass('col-3') || $currentFieldset.hasClass('col-2')) && $currentFieldset.find('ul.form-fields-wrap > li:nth-child(2n+1)').addClass('odd');
								($currentFieldset.hasClass('col-3') || $currentFieldset.hasClass('col-2')) && $currentFieldset.find('ul.form-fields-wrap > li:nth-child(2n)').addClass('even');
							}
							
							$currentFieldset.hasClass('col-1') && $currentFieldset.find('ul.form-fields-wrap > li:nth-child(2n+1)').addClass('odd');
							$currentFieldset.hasClass('col-1') && $currentFieldset.find('ul.form-fields-wrap > li:nth-child(2n)').addClass('even');
						}
					};
					
					this.validateForm = function($wrapper){
						var $form = $($wrapper[0]),
							inputsArr = $form.find('input[data-validation]:not(.date-wrap input), select[data-validation]:not(.date-wrap input), textarea[data-validation]'),
							dateArr = $form.find('.date-wrap'),
							isValid = true;
							
						for (var ia=0, iaLen = inputsArr.length; ia<iaLen; ia++){
							var $inputElem = $(inputsArr[ia]),
								errorObj = ($inputElem.attr('data-error') && $inputElem.attr('data-error').length > 0) ? JSON.parse($inputElem.attr('data-error')) : "",
								validObj = ($inputElem.attr('data-validation') && $inputElem.attr('data-validation').length > 0) ? JSON.parse($inputElem.attr('data-validation')) : "",
								required = ($inputElem.attr('required') || (validObj && validObj.required)) ? true : false,
								maxlength = ($inputElem.attr('maxlength')) ? $inputElem.attr('maxlength') : -1,
								validationObj = $.extend(true, {"required" : required,"maxlength" : maxlength}, validObj);
							
							// Validation for Radio Buttons. Checking only for Required validation.
							if (($inputElem.attr('type') === 'radio') && $inputElem.parents('ul.radio-btn-wrap').length > 0){
								var radioName = $inputElem.attr('name'),
									$radioElem = $inputElem.parents('ul.radio-btn-wrap'),
									radioReqObj = $radioElem.data('validation'),
									radioReq = (radioReqObj && radioReqObj.required) ? radioReqObj.required : false,
									radioReqErrorObj = $radioElem.data('error');
									
								if ((radioReq === "true") && $radioElem.find('input[name='+radioName+']:checked').length === 0){
									isValid = false;
									showError($radioElem, 'required', radioReqErrorObj);									
								}else{
									hideError($radioElem);
								}
								continue;
							}
							
							// Validation for Date Field.
							/* if ($inputElem.hasClass('date-validation') && $inputElem.parents('.date').length > 0){
								if (!dateFlag){
									var $dateElem = $inputElem.parents('.date-wrap'),
										validObj = $dateElem.data('validation'),
										month = $dateElem.find('div.month-wrap select.month')[0].value,
										day = $dateElem.find('div.day-wrap select.day')[0].value,
										year = $dateElem.find('div.year-wrap select.year')[0].value,
										fullDate = year+'-'+month+'-'+day;										
									
									required = validObj.required;
									$inputElem  = $dateElem;
									validationObj = validObj;
									errorObj = $dateElem.data('error');
									
									$inputElem.val(fullDate);
									dateFlag = true;
								}else{
									continue;
								}
							} */
							
							for (var key in validationObj){
								var validate = true;
								(required || trim($inputElem.val()).length > 0) && validations[key] && (validate = validations[key]($inputElem, validationObj[key]));
								if (!validate){
									isValid = false;
									showError($inputElem, key, errorObj);
									break;
								}else if(validate){
									hideError($inputElem);
								}
							}
						}
						
						return isValid;
					}
					
					var validations = {
						minlength : function($elem, val){
							var inputStr = trim($elem.val()),
								minLen = val;
								
							return (inputStr.length >= minLen) ? true : false;
						},
						maxlength : function($elem, val){
							var inputStr = trim($elem.val()),
								maxLen = val;
								
							return (val === -1) ? true : inputStr.length <= maxLen;
						},
						required : function($elem, val){
							var inputStr = trim($elem.val());
							return val ? inputStr.length > 0 : true;
						},						
						regex : function($elem, val){
							var regexStr = new RegExp(val),
								inputStr = trim($elem.val());
								
							return regexStr.test(inputStr);
						},
						validemail : function($elem, val){
							var regexStr = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
								inputStr = trim($elem.val());
							
							return regexStr.test(inputStr);
						},
						validname : function($elem, val){
							var regexStr = /^[a-zA-Z][a-zA-Z0-9]{3,50}$/,
								inputStr = trim($elem.val());
								
							return regexStr.test(inputStr);
						},
						validdate : function($elem, val){
							var dateArr = $elem.val().split('-'),
								validFlag = true;
							if (dateArr.length === 3){
								for(var i=0, l=dateArr.length; i<l; i++){
									(trim(dateArr[i]).length <= 0) && (validFlag=false);
								}
							}else{
								validFlag = false;
							}
							return validFlag;
						},
						validmobile : function($elem, val){
							var regex = /^\d{9,10}$/;							
							return regex.test($elem.val());
						},
						mindate : function($elem, val){
							var dateArr = val.split('-'),
								currentDateArr = $elem.val().split('-'),
								minDate = new Date(dateArr[0], dateArr[1], dateArr[2]),
								currentDate = new Date(currentDateArr[0], currentDateArr[1], currentDateArr[2]);
							return minDate < currentDate;
						},
						maxdate : function($elem, val){
							var dateArr = val.split('-'),
								currentDateArr = $elem.val().split('-'),
								maxDate = new Date(dateArr[0], dateArr[1], dateArr[2]),
								currentDate = new Date(currentDateArr[0], currentDateArr[1], currentDateArr[2]);
							return maxDate > currentDate;
						},
						onlyNumber: function($elem, val){
							var regex = /^\d+$/;
							
							return regex.test($elem.val());
						}
					};
					
					var showError = function($elem, key, errorObj){
						var $errorDom = $('<span class="error-wrap"></span>'),
							$parent = $($elem.parents('.validation-parent')[0]),
							errorStr = (errorObj && errorObj[key]) || errorRepo[key] || errorRepo.general;
						
						$parent.find('span.error-wrap').remove();
						
						$parent.addClass('validation-error');
						$errorDom.text(errorStr);
						$errorDom.addClass(key);
						$parent.append($errorDom);
					};
					
					var hideError = function($elem){
						var $parent = $($elem.parents('.validation-parent')[0]);
						
						$parent.find('span.error-wrap').remove();
						$parent.removeClass('validation-error');
					}
					
					var trim = function(str){
						return (''.trim) ? str.trim() : $.trim(str);
					}
					
					return this;
				};
				return new _cstmForm();
			}());

            var cstmOverlay = (function () {
                function _cstmOverlay() {
                    var that = this,
						iframeHeight,
						scrollPosition;

                    // initiating this component.
                    this.init = function () {
						$('body').append('<div class="glsml-overlay remove-opacity normal hidden"><div class="overlay-wrap"><div class="outer-wrap"><span class="close-overlay"></span><div class="inner-wrap"></div></div></div></div>');
						$('body').append('<div class="glsml-overlay remove-opacity loader-anim hidden"><div class="overlay-wrap"><div class="outer-wrap"><span class="close-overlay"></span><div class="inner-wrap"></div></div></div></div>');
                        attachEvents();
                    };
					
                    this.resize = function () {
                        if ($(window).height() > 400) {
                            $('div.glsml-overlay.normal .inner-wrap').css('max-height', $(window).height() - 100);
                        } else {
                            $('div.glsml-overlay.normal .inner-wrap').css('max-height', 500);
                        }
						
						positionOverlay();
                    };
					
					this.bodyClick = function(){
						$(document).delegate('body:not(div.glsml-overlay.normal)', 'click', function(evt){
							if ($(evt.target).parents('div.glsml-overlay.normal .outer-wrap').length === 0 && $('body').hasClass('active-overlay')){
								closeOverlay();
							}							
						});
					};

                    var attachEvents = function () {
                        // Attaching click event to overlay anchor. When triggered, the overlay would be shown.
                        $(document).delegate('.overlay-anchor', 'click', function (evt) {
							evt.stopPropagation();
							
                            var $this = $(this);

                            if ($this.hasClass('hash-anchor')){
                                that.hashAnchor($this.attr('data-display'), $this);
                            }else if ($this.hasClass('ajax-anchor')) {
                                that.ajaxAnchor($this.attr('data-display'), $this);
                            } else if ($this.hasClass('iframe-anchor')) {
                               that.iframeAnchor($this.attr('data-display'), $this);
							}
						});

                        $(document).delegate('span.close-overlay', 'click', function (evt) {
                            closeOverlay();
                        });
					};
					
					this.showLoading = function(flag){
						var $overlayWrap = $('div.glsml-overlay.loader-anim .overlay-wrap'),
							$outerWrap = $('div.glsml-overlay.loader-anim .outer-wrap');
						if (flag === false){
							closeOverlay('loader');
							setTimeout(function(){
								$outerWrap.removeClass('hidden');
								($('.loading-circles-wrap')[0]) && $('.loading-circles-wrap').remove();
							}, 500);
						}else{
							var $contentHtml = $('<div class="loading-circles-wrap"><div class="loading-circles i"></div><div class="loading-circles ii"></div><div class="loading-circles iii"></div></div>');
							
							$outerWrap.addClass('hidden');
							beginOverlay('loader');
							$overlayWrap.append($contentHtml);
							completeOverlay('loader');
						}
					}
					
					this.hashAnchor = function(contentId){
						var $contentHtml = $('#' + contentId).clone(),							
							$innerWrap = $('div.glsml-overlay.normal .inner-wrap'),
							contentImg = $contentHtml.find('img'),
							totalImg = contentImg.length,
							loadedImgCnt = 0;
						
						beginOverlay();
						
						$contentHtml.hasClass('hidden') && $contentHtml.removeClass('hidden');
						$innerWrap.html($contentHtml);						
						runOverlayScript($contentHtml);
						completeOverlay();						
					};
					
					this.ajaxAnchor = function(link, $initiator){
						var dispLink = link.split('#'),
							ajaxLink = dispLink[0],
							$contentHtml = "",
							$innerWrap = $('div.glsml-overlay.normal .inner-wrap'),
							queryStr = link.split('?')[1];
						
						beginOverlay();
						
						$.ajax({
							url: ajaxLink,
							type: "GET",
							cache: false,
							//dataType: "text/html",
							contentType: "text/html",
							success: function (response, status, jqXHR) {
								var doc = document.createElement('html');
								try {
									doc.innerHTML = response;
								} catch (e) {
									$(doc).html(response);
								}

								if (dispLink.length > 1) {
									$contentHtml = $(doc).find('#' + dispLink[1]);
								} else {
									$contentHtml = $(doc).find('body');
								}
								$contentHtml.removeClass('hidden');
								$innerWrap.html($contentHtml);
								runOverlayScript($contentHtml, queryStr, $initiator);				
								completeOverlay();
								
							},
							error: function (jqXHR, textStatus, errorThrown) {
								//console.log(textStatus);
								//console.log(errorThrown);									
							}
						});
					};
					
					this.iframeAnchor = function(link, $anchor){
						var iframe = document.createElement('iframe'),
							url = link.split('#')[0],
							$innerWrap = $('div.glsml-overlay.normal .inner-wrap');						
						beginOverlay();
						
						('frameBorder' in iframe) && (iframe.frameBorder = 0);
						('allowTransparency' in iframe) && (iframe.allowTransparency = "true");
						//iframe.scrolling = "no";
						
						$(iframe)
							.attr({
								src: url,								
								'class': 'overlay-iframe',
								'id': 'overlayIframe',
								'name' : 'overlayIframe',
								allowFullScreen : true // allow HTML5 video to go fullscreen
							})
							.appendTo($innerWrap);
						
						iframeHeight = 500;
						completeOverlay('iframe');						
					};
					
					var onMessage = function (messageEvent) {
						if (messageEvent.data["height"]) {
							iframeHeight = messageEvent.data["height"];
						}
						completeOverlay();
					}
					
					var runOverlayScript = function($elem, queryStr, $initiator){
						var scriptExec = $elem.attr('data-script-exec'),
							scriptLoad = $elem.attr('data-script-load'),
							scriptLoadArr = (scriptLoad && scriptLoad.length > 0) ? scriptLoad.split(',') : [],
							funcAttr = (queryStr && queryStr.length > 0) ? queryStr : $elem.attr('id');
						
						// loading scripts.
						for(var i=0, l=scriptLoadArr.length; i<l; i++){
							var script=document.createElement('script');
								script.type='text/javascript';
								script.src=scriptLoadArr[i];
								
							document.head.appendChild(script);
						}
						
						// Executing scripts.
                        try{
						(scriptExec && scriptExec.length > 0 && window.hasOwnProperty(scriptExec)) && window[scriptExec]($elem.attr('id'), queryStr, $initiator);
                        } catch(err){
                            console.log('Error while executing function'+scriptExec);
                            console.log('Error : \n'+err);
                        }
					};
					
					var beginOverlay = function(type){
						var $cstmOverlay = (type === 'loader') ? $('div.glsml-overlay.loader-anim') : $('div.glsml-overlay.normal'),
							$innerWrap = $cstmOverlay.find('.inner-wrap'),
							windowHeight = $(window).height(),
							maxHeight = windowHeight - 100;
						
						scrollPosition = $(document).scrollTop();
						
						// making overlay active.
						var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
						if (iOS !== true) {
							$('body').addClass('active-overlay').css('top', -scrollPosition+'px');		
						}else{
							$('body').css('top', -scrollPosition+'px');
						};

						$cstmOverlay.removeClass('hidden');
						
						// setting max-height for overlay.
						if (maxHeight > 500) {
							$innerWrap.css('max-height', maxHeight);
						} else {
							$innerWrap.css('max-height', 500);
						}
					}
					
					var positionOverlay = function(type){
						var $cstmOverlay = (type === 'loader') ? $('div.glsml-overlay.loader-anim') : $('div.glsml-overlay.normal'),
							windowHeight = $(window).height(),
							$innerWrap = $cstmOverlay.find('.outer-wrap'),
							innerHeight = $innerWrap.height(),
							$iframe = $innerWrap.find('iframe'),
							hasIframe = $iframe.length > 0;
						
						if (hasIframe){
							$('#overlayIframe').attr('height', iframeHeight);
							var marginTop = (windowHeight > iframeHeight) ? (windowHeight-iframeHeight)/2 : 50;
						}else{
							var marginTop = (windowHeight > innerHeight) ? (windowHeight-innerHeight)/2 : 50;
						}
						$innerWrap.css('margin-top',marginTop+'px');
					};
					
					var completeOverlay = function(type){
						positionOverlay(type);
						var $cstmOverlay = (type === 'loader') ? $('div.glsml-overlay.loader-anim') : $('div.glsml-overlay.normal');
						(type === 'iframe') ? $cstmOverlay.find('.outer-wrap').css('width', '90%') : $cstmOverlay.find('.outer-wrap').css('width', ($cstmOverlay.find('.inner-wrap').children().width()+10)+'px');
						if (type === 'iframe') $cstmOverlay.find('iframe').css('width', '100%');
						$cstmOverlay.removeClass('remove-opacity');
						//setTimeout(function () { $cstmOverlay.removeClass('remove-opacity') }, 1);
					};
					
					var closeOverlay = function(type){
						var $glsmlOverlay = (type === 'loader') ? $('div.glsml-overlay.loader-anim') : $('div.glsml-overlay.normal');
						$glsmlOverlay.addClass('remove-opacity');
						setTimeout(function () { 
							$glsmlOverlay.find('.inner-wrap').html('').removeAttr('style');
							$glsmlOverlay.addClass('hidden') 
						}, 501);
						$('body').removeClass('active-overlay');
						$(document).scrollTop(scrollPosition);
						$glsmlOverlay.removeClass('carouselOverlayWrap');
					};
                };

                return new _cstmOverlay();
            }());
			
			var notifier = (function(){
				function _notifier(){
					
					var notifier = this;
				
					this.init = function(){
						initNotifier();
						attachEvents();					
					};
					
					this.notify = function(type, msg, alertFlag){
						if (type === 'success' || type === 'warn' || type === 'info' || type === 'error'){
							var $notifierWrap = $('#cstm_notifier'),
								$notifier = $('<div class="notify"><p class="notify-msg"></p></div>');
							
							// Assign Class and value.
							$notifier.addClass(type).find('.notify-msg').html(msg);							
							
							// Show wrapper.
							if ($notifierWrap.hasClass('hidden')){	// In case of first Notifier.
								$notifierWrap.removeClass('hidden');								
							}else{	// In case of second Notifier.
								var $currentNotifier = $notifierWrap.find('.notify:not(notify.exit)');
								
								$currentNotifier.removeClass('hide').addClass('exit');
								setTimeout(function(){
									$currentNotifier.remove();
								}, 510);
							}
							$notifierWrap.append($notifier);
							setTimeout(function(){
								$notifier.addClass('hide');
							}, 10000);
							setTimeout(function(){
								$notifier.remove();
								if ($notifierWrap.find('.notify').length === 0){
									$notifierWrap.addClass('hidden');
								}
							}, 10510);
							
							//Showing Alert.
							alertFlag && alert(msg);
							
						}
					};
					
					var initNotifier = function(){
						var $notifierWrap = $('<div id="cstm_notifier" class="hidden"></div>');
						
						$('body').append($notifierWrap);
					};
					
					var attachEvents = function(){
						
					};
					
					return this;
				}
				
				return new _notifier();
			}());
			
			return this;
		};
		return new _reusables();
	}());
})(jQuery, this, this.document, RSSB);

;(function($, window, document, RSSB, undefined){
	// Global DOM Ready event. This event fires as soon as HTML document is loaded.
	$(function(){
		RSSB.reusables.init();
		
		$(document).delegate('body', 'click', function(){
			RSSB.reusables.bodyClicks();
		});
		
		window.onerror = function(message, url, lineNumber) {  
			//save error and send to server for example.
			var fileArr = url.split('/'),
				fileName = fileArr[fileArr.length-1],
				fileNameArr = fileName.split('?'),
				actualFile = fileNameArr[0],
				msg = "<div style='border-top: 1px solid #fff;border-bottom: 1px solid #fff; text-align: center; font-weight: bold;'>JavaScript Error</div>"+message+"<div style='border-top: 1px solid #fff;border-bottom: 1px solid #fff; text-align: right; font-style: italic;'>"+actualFile+" (#"+lineNumber+")</div>";
			
			RSSB.reusables.notify('error', msg, false);
			return false;
		};
	});
	
	// Global window load event. This event fires only after all the js, css, images and other resources have been loaded.
	$(window).load(function(){
		RSSB.reusables.load();
	});
	
	// Global Window resize event. This event fires whenever the window is resized OR device orientation is changed.
	$(window).resize(function(){
		RSSB.reusables.resize();
	});
	
	// Global Window scroll event. This event fires whenever the scroll is used.
	$(window).scroll(function(){
		//RSSB.reusables.scroll();
	});
})(jQuery, this, this.document, RSSB);


