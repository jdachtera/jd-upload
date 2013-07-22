/**
 * jdUpload
 *
 * Inspired by https://github.com/twilson63/ngUpload
 *
 * Jascha Dachtera <jascha.dachtera@gmail.com>
 */
angular.module('jdUpload', []).

	directive('jdUpload', ['$timeout', function($timeout) {
		return {
			restrict: 'AC',
			scope: {
				onFinished: '&',
				onSuccess: '&',
				onError: '&',
				jdAutoSubmit: '=',
				jdPlaceholder: '@',
				jdState: '=?',
				jdUrl: '@',
				jdUrlMethod: '&',
				jdJson: '='
			},
			link: function(scope, element, attrs) {
				scope.jdState = false;

				function bindChange() {
					if(scope.jdAutoSubmit) {
						element.bind('change', function () {
							scope.jdState = true;
							upload();
						})
					}
				}
				bindChange();

				scope.$watch('jdState', function() {
					upload();
				});

				var upload = function() {
					var value, form, placeholder, iframe, id;

					if (scope.jdState === true) {

						value = element.val();
						if(!value || value == '') {
							scope.jdState = false;
							scope.onFinished({content: null, didUpload: false});
						} else {
							id = Math.random().toString(36).substring(7);
							url = (scope.jdUrlMethod ? scope.jdUrlMethod() : scope.jdUrl) || '';

							// submit the form - requires jQuery
							form = angular.element('<form></form>');

							form.attr("target", id);
							form.attr("method", "post");
							form.attr("action", url);
							form.attr("enctype", "multipart/form-data");
							form.attr("encoding", "multipart/form-data");

							placeholder = scope.jdPlaceholder ? angular.element(scope.jdPlaceholder) : element.clone();

							element.replaceWith(placeholder);

							form.append(element);
							form.hide();

							// create a new iframe
							iframe = angular.element("<iframe id='" + id + "' name='" + id + "' />");

							// add the new iframe and the form to application
							angular.element(document.body).append(form);
							form.append(iframe);

							// attach function to load event of the iframe
							iframe.bind('load', function () {
								// get content - requires jQuery
								var content = iframe.contents().find('body').text();

								if (scope.jdJson) {
									content = angular.fromJson(content);
								}

								placeholder.replaceWith(element);
								bindChange(); // Setup binding after element added back to DOM

								// execute the upload response function in the active scope
								scope.$apply(function () {
									scope.jdState = false;
									scope.onSuccess({content: content});
									scope.onFinished({content: content, didUpload: true});
								});

								// remove iframe
								// Taken from https://github.com/twilson63/ngUpload
								if (content !== "") { // Fixes a bug in Google Chrome that dispose the iframe before content is ready.
									$timeout(function () {
										iframe.remove();
										form.remove();
									}, 250);
								}
							});

							// Attach error handler
							iframe.bind('error', function() {
								scope.$apply(function () {
									scope.jdState = false;
									scope.onError({content: content});
									scope.onFinished({content: content, didUpload: false});
								});
							});

							form.submit();
						}
					}
				}

			}

		};
	}]);