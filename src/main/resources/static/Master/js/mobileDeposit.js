(function($, window, document, RSSB, undefined){
	RSSB.RegisterMobile = (function(){
		function _registerMob(){
			var thisViewModel,
				mobile = {

					"mobileNo" : ""
				},
				token = {
					"count" : "",
					"tokenId" : ""
				},
				user = {
					"id" : "",
					"name" : "",
					"mobileNo" : "",
					"gender" : "",
					"alternateNumber" : "",
					"fatherName" : "",
					"motherName" : "",
					"status" : "",
					"regTime" : "",
					"updateTime" : ""
				}
			
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
				self.mobile = mobile;
				self.mobile.mobileNo = ko.observable();
				//elf.mobile.name = ko.observable();
				
				self.token = token;
				self.token.count = ko.observable();
				self.token.tokenId = ko.observable();
				self.token.detailsId = ko.observable();
				
				self.user = user;
				self.user.id = ko.observable();
				self.user.mobileNo = ko.observable();
				self.user.name = ko.observable();
				self.user.gender = ko.observable();
				self.user.alternateNumber = ko.observable();
				self.user.fatherName = ko.observable();
				self.user.motherName = ko.observable();
				self.user.image = ko.observable("images/userDefault.png");
				//self.user.status = ko.observable();
				//self.user.regTime = ko.observable();
				//self.user.updateTime = ko.observable();
				
				self.fetchDetails = function(){
					var data = ko.mapping.toJS(self.mobile),
						isValid = RSSB.reusables.validateForm($('#user-details'));
					if (isValid){
						console.log(data);
						RSSB.serviceCall('GET', '/rest/mda/mobileDetails/mobile='+self.mobile.mobileNo(), JSON.stringify(data), setUserData);
					}
				};
				
				self.issueToken = function(){
					var data = ko.mapping.toJS(self.token),
						isValid = RSSB.reusables.validateForm($('#issue-token'));
					if (isValid){
						console.log(data);
						RSSB.serviceCall('POST', '/rest/mda/mobileDetails/signIn', JSON.stringify(data), setUserData);
					}
				}
				
				self.resetUserDetails = function(){
					self.mobileNo("");
					self.name("");
				}
				
				function setUserData(type, response){
					self.user.id(response.id);
					self.token.detailsId(response.id);
					self.user.mobileNo(response.mobileNo);
					self.user.name(response.name);
					self.user.gender(response.gender);
					self.user.alternateNumber(response.alternateNumber);
					self.user.fatherName(response.fathersName);
					self.user.motherName(response.mothersName);
					//self.user.status(response.status);
					//self.user.regTime(response.regTime);
					//self.user.updateTime(response.updateTime);					
				}
			};
			
			return this;
		};
		
		return new _registerMob();
	}());
	
	$(function(){
		RSSB.RegisterMobile.init();
	});
})(jQuery, this, this.document, RSSB);	// IIFE