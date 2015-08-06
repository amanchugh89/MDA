(function($, window, document, RSSB, undefined){
	RSSB.RegisterMobile = (function(){
		function _registerMob(){
			var thisViewModel,
				mobile = {
					"name" : "",
					"count" : "",
					"signIn" : ""
				},
				token = {

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
				self.mobile.count = ko.observable();
				self.mobile.name = ko.observable();
				self.mobile.signIn = ko.observable();
				
				self.token = token;

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
				
				self.fetchData = function(){
					var token = ko.mapping.toJS(self.token),
						isValid = RSSB.reusables.validateForm($('#token-details'));
					if (isValid){
						console.log(token);
						RSSB.serviceCall('POST', '/rest/mda/mobileDetails/pendingWithdrawal/', self.token.tokenId(), setUserData);
					}
				};
				
				self.issueMobile = function(){
					var data = ko.mapping.toJS(self.token),
						isValid = RSSB.reusables.validateForm($('#issue-token'));
					if (isValid){
						console.log(data);
						RSSB.serviceCall('POST', '/rest/mda/mobileDetails/signOut', JSON.stringify(data), mobileIssued);
					}
				}
				
				self.resetFields = function(){

					self.token.tokenId("");
				}
				
				function setUserData(type, response){
					self.user.id(response.details.id);
					self.token.detailsId(response.details.id);
					self.user.mobileNo(response.details.mobileNo);
					self.user.name(response.details.name);
					self.user.gender(response.details.gender);
					self.user.alternateNumber(response.details.alternateNumber);
					self.user.fatherName(response.details.fathersName);
					self.user.motherName(response.details.mothersName);

					self.mobile.count(response.entry[0].count);
					self.mobile.name(response.details.name);
					self.mobile.signIn(new Date(response.entry[0].signIn).toDateString());
					$('#issueMobile').removeAttr('disabled');
					//self.user.status(response.status);
					//self.user.regTime(response.regTime);
					//self.user.updateTime(response.updateTime);
				}

				function mobileIssued(type, result){
					if (type == 'success'){
						RSSB.reusables.notify('success', 'Mobile has been successfully issued back at '+result.signOut, false);
					}
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