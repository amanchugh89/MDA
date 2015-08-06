(function($, window, document, RSSB, undefined){
	RSSB.RegisterMobile = (function(){
		function _registerMob(){
			var thisViewModel,
				model = {
					"id" : "",
					"name" : "",
					"fathersName" : "",
					"mothersName" : "",
					"gender" : "",
					"mobileNo" : "",
					"alternateNumber" : "",		
					"image" : "",
					"address" : ""
				},
				token = {
					"count" : "",
					"tokenId" : ""
				};
			
			this.init = function(){
				ko.applyBindings(new viewModel());
			};
			
			/* var getVM = function(msg, result){
				
				if (result.HasError == true) {
					RSSB.reusables.notify('error', result.ErrorSummary, false);
				}
				else {
					_model = ko.mapping.fromJS(result.mobileDetails);					
					ko.applyBindings(new viewModel(_model));
				}
			} */
			
			var viewModel = function(){
				var self = this;
				
				/**
				 * Basic Details
				**/
				self.addressList = ko.observableArray();
				getAddressList();
				self.model = model;
				self.model.id = ko.observable();
				self.model.name = ko.observable();
				self.model.fathersName = ko.observable();
				self.model.mothersName = ko.observable();
				self.model.gender = ko.observable();
				self.model.mobileNo = ko.observable();
				self.model.alternateNumber = ko.observable();
				self.model.image = ko.observable("images/userDefault.png");
				self.photo = ko.observable();

				self.model.address = ko.observable();
				self.addDetails = ko.observable();
				self.addCity = ko.observable();
				self.addState = ko.observable();
				self.addPin = ko.observable();
				self.addCountry = ko.observable();
				
				self.token = token;
				self.token.detailsId = ko.observable();
				self.token.tokenId = ko.observable();
				self.token.count = ko.observable();

				self.photo.subscribe(function(newValue) {
					var reader = new FileReader();
					reader.onload = function (e) {
						self.model.image(e.target.result);
					};
					reader.readAsDataURL($('#userImage')[0].files[0]);
				});

				function getAddressList(){
					RSSB.serviceCall('GET', 'js/addressJSON.js', '', function(msg, result){
						self.addressList(result);
					});
				}
				
				self.saveDetails = function(){
					save();
				};
				
				self.saveNIssueToken = function(){
					save(true);					
				};
				
				self.issueToken = function(){
					self.token.detailsId = self.model.id;
					
					var data = ko.mapping.toJS(self.token),
						isValid = RSSB.reusables.validateForm($('#issue-token'));
					if (isValid){
						console.log(data);
						RSSB.serviceCall('POST', '/rest/mda/mobileDetails/signIn', JSON.stringify(data), removeTokenOverlay);
					}
				};
				
				self.resetForm = function(){
					self.model.id("");
					self.model.name("");
					self.model.fathersName("");
					self.model.mothersName("");
					self.model.gender("");
					self.model.mobileNo("");
					self.model.alternateNumber("");
					self.model.image("");
					self.photo("");
					self.model.address("");
					self.addDetails("");
					self.addCity("");
					self.addState("");
					self.addPin("");
					self.addCountry("");
				}
				
				function save(flag){
					self.model.address(self.addDetails()+", "+self.addCity()+", "+self.addState()+"-"+self.addPin()+", "+self.addCountry());
					var data = ko.mapping.toJS(self.model),
						isValid = RSSB.reusables.validateForm($('#mobile-reg'));
					if (isValid){
						console.log(data);
						if (flag){
							// Show overlay.
							$('.deposite-mobile').removeClass('remove');
						}
						RSSB.serviceCall('POST', '/rest/mda/mobileDetails', JSON.stringify(data), register);
					}
				}
				
				function register(success,response){
					self.resetForm();
					self.model.id(response.id);

					RSSB.reusables.notify('success', 'User has been successfully registered. User ID is: '+response.id, false);
				};

				function removeTokenOverlay(type, result){
					if (type == "success"){
						$('.deposite-mobile').addClass('remove');
						self.token.detailsId = ko.observable();
						self.token.tokenId("");
						self.token.count("");

						RSSB.reusables.notify('success', 'Token as been issued successfully at '+result.signIn, false);
					}
				};
				
			};

			return this;
		};
		
		return new _registerMob();
	}());
	
	$(function(){
		RSSB.RegisterMobile.init();
	});
})(jQuery, this, this.document, RSSB);	// IIFE