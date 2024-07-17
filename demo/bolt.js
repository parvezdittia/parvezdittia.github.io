'use strict';

var process = {
  env: {}
}

function convertStringToFunction (functionAsString) {
  let returnFunction = () => {}
  // Extracting the function parameters and body from the string
  const functionSignature = functionAsString?.match(/function\s+([^(]*)\(([^)]*)\)/);
  if (functionSignature?.length >= 3) {
      const functionParams = functionSignature[2].split(',').map(param => param.trim());
      const functionBody = functionAsString.slice(functionAsString.indexOf('{') + 1, -1).trim();
      returnFunction = Function(...functionParams, functionBody);
  }
  return returnFunction;
  }

let boltDomainName = null;
let isBoltCached = false;
let ICPconfTemp = null;
const boltMob =
	(!/(tablet|ipad|playbook|PAD)|(android(?!.*(mobi|opera mini)))/i.test(
		navigator.userAgent
	) &&
		/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
			navigator.userAgent
		)) ||
	/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
		navigator.userAgent.substr(0, 4)
	);
const boltIsIE = function () {
	const ua = window.navigator.userAgent;
	const ie10orless = ua?.indexOf('MSIE ');
	const ie11 = ua?.indexOf('Trident/');
	const edge = ua?.indexOf('Edge/');
	const xiaomi = ua?.indexOf('XiaoMi/MiuiBrowser');
	const xiaomi1 = ua?.indexOf('XiaoMi');
	if (
		ie10orless > -1 ||
		ie11 > -1 ||
		edge > -1 ||
		xiaomi > -1 ||
		xiaomi1 > -1
	) {
		return true;
	} else {
		return false;
	}
};
let boltPayId = null;
const boltiOS = /iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const boltiPad = navigator.userAgent?.indexOf('iPad') > -1 && !window.MSStream;
const boltMacOs =
	navigator.appVersion?.indexOf('Mac') != -1 &&
	navigator.userAgent.search('Safari') >= 0
		? true
		: false;
const boltLTIE9 = !document.addEventListener && boltIsIE;
const boltOpera =
	boltMob &&
	(navigator.userAgent?.indexOf('OPR') != -1 ||
		navigator.userAgent?.indexOf('OPiOS') != -1) &&
	navigator.userAgent?.indexOf('Version') != -1;
const boltUCBrowser = !boltiOS
	? navigator.userAgent?.indexOf('UCBrowser') != -1 &&
	  navigator.userAgent.substr(navigator.userAgent.length - 6) == 'Mobile'
	: false;
const boltIphoneFirefox =
	boltMob && boltiOS && navigator.userAgent?.indexOf('FxiOS') !== -1;
const boltSupported =
	boltOpera || boltLTIE9 || boltUCBrowser || boltIphoneFirefox;
let boltIProp = '';
let boltPrefetcher = null;
let boltIphoneCss = document.createElement('style');
const bolt_invoice = false;
let secureUrl = process.env.SECURE_URL || 'https://secure.payu.in/_payment';
//'http://localhost:8083/user';
let expressUrl =
 'http://localhost:8080/public/?domain=%22localhost%22#/express';
let prefetchUrl = process.env.PREFETCH_URL || 'https://api.payu.in/public/#';
let origin = process.env.ORIGIN || 'https://api.payu.in';
let curOverflow = null;
/* Polyfill to fix surl/furl redirection in IE-11 */
if (!String.prototype.startsWith) {
	Object.defineProperty(String.prototype, 'startsWith', {
		value: function (search, pos) {
			pos = !pos || pos < 0 ? 0 : +pos;
			return this.substring(pos, pos + search.length) === search;
		},
	});
}
if (boltMob) {
	if (!boltiOS) {
		boltIProp =
			'display:block;position:fixed;visibility:visible;width:100%;height:100%;min-height:90vh;left:0;top:0;z-index:10000;overflow:hidden;background: rgba(0, 0, 0, 0.0) none repeat scroll 0 0;';
	} else {
		boltIProp =
			'display:block;position:fixed;visibility:visible;width:100%;height:100%;min-height:90vh;left:0;top:0;z-index:10000;overflow:hidden;background: rgba(0, 0, 0, 0.0) none repeat scroll 0 0;';
	}
} else if (!boltiPad) {
	if (!boltiOS)
		boltIProp =
			'display:block;position:fixed;visibility:visible;width:100%;height:100%;min-height:90vh;left:0;top:0;z-index:10000;overflow:hidden;background: rgba(0, 0, 0, 0.0) none repeat scroll 0 0;';
	else
		boltIProp =
			'display:block;position:fixed;visibility:visible;width:100%;height:100%;min-height:90vh;left:0;top:0;z-index:10000;overflow:hidden;background: rgba(0, 0, 0, 0.0) none repeat scroll 0 0;';
} else
	boltIProp =
		'display:block;position:absolute;visibility:visible;width:100%;height:100%;min-height:90vh;left:0;right:0;bottom:0;top:0;z-index:10000;overflow:hidden;background: rgba(0, 0, 0, 0.0) none repeat scroll 0 0;';
let boltIframe = null;
window.onbeforeunload = function () {};

// prefethcer new function
(function injectLinkPrefetchIn4g() {
	const linkTag = document.createElement('link');
	linkTag.rel = 'prefetch';
	linkTag.href = prefetchUrl;
	linkTag.as = 'document';
	document.head.appendChild(linkTag);
})();

const bolt = (function () {
	let iframeRef;
	let loaderRef;
	let loaderImgRef;
	let configObj;
	let dropIn = true;
	Array.prototype.indexOf = function (obj, start) {
		for (var i = start || 0, j = this.length; i < j; i++) {
			if (this[i] === obj) {
				return i;
			}
		}
		return -1;
	};
	function launch(request, handler) {
		if (!boltSupported) {
			responseMode(request.mode);
			delete request.mode;
			var ICP_OBJ = ICPconfData(request?.isCheckoutExpress);
			if (ICP_OBJ.ICPconf) {
				// Express: will show different loader for different iframe like for express different loader
				if (!request.noLoader) {
					appendLoader();
				}
				if (ICP_OBJ.isBoltCached && iframeRef && !bolt_invoice) {
					if ((boltiOS && boltMob) || boltiPad) {
						window.scrollTo(0, 0);
						boltIphonCssApply();
					}
					loaderRef.style.display = 'block';
					iframeRef.style.display = 'block';
					if (iframeRef !== undefined) {
						iframeRef.scrolling = 'no';
					}
					iframeRef.contentWindow.postMessage(
						{
							evt: 'cache',
						},
						`${origin}`
					);
				} else {
					boltAndExpressHandler(ICP_OBJ.ICPconf);
				}
			} else {
				catchExceptionHandler(
					'Payment processing failed. Please try again later'
				);
			}
		} else {
			catchExceptionHandler(
				'Sorry ! This browser is not supported. Please choose another.'
			);
		}
        function boltAndExpressHandler(ICP_OBJ_DETAIL) {
			// in case of icp every time we have to create new iframe so that we can send new request to bolt
            if (iframeRef != null) {
                removeBolt();
            }
			var targetBolt = 'boltFrame';
			const iframeBodyContainer = document.getElementsByTagName('body');
			//stored current overflow style in variable and then remove once iframe is closed and set it back to body
			if(iframeBodyContainer && iframeBodyContainer[0]){
				curOverflow = iframeBodyContainer[0].style.overflow;
			    iframeBodyContainer[0].style.overflow = 'hidden';
			}
            //ICP_OBJ.ICPconf.service_provider = 'payu_paisa';
            if (targetBolt) {
                createBoltFr(request.customClass);
                iframeRef = document.getElementById('boltFrame');
                var iframeParentNode = document.getElementsByTagName('body')[0];
                iframeParentNode.appendChild(boltIframe);
            }
            // here we have to change url https://pp26secure.payu.in/_payment for prefetcher call to success
            // var url = "http://localhost:8081/user?x=1";
            var f = document.createElement('form');
            let requestMethod = 'POST';
            let url = secureUrl;
            //ICP_OBJ.ICPconf is request object.
            //this is new condition for express checkout where isCheckoutExpress is true for express checkout
            if (ICP_OBJ_DETAIL.isCheckoutExpress) {
                requestMethod = 'GET';
                url = expressUrl;
                const domainName = window.location?.origin;
                var merchentData = document.createElement('input');
                merchentData.setAttribute('type', 'hidden');
                merchentData.setAttribute('name', 'domain');
                merchentData.setAttribute('value', JSON.stringify(domainName));
                f.appendChild(merchentData);
            } else {
                // this condition is for bolt checkout to send data in form post payload creating empty input field for all the keys
				ICP_OBJ_DETAIL.boltEnabled = 'true';
				ICP_OBJ_DETAIL.icp_source = "newBolt";
                for (var key in ICP_OBJ_DETAIL) {
                    if (ICP_OBJ_DETAIL.hasOwnProperty(key) && typeof(ICP_OBJ_DETAIL[key]) !== "object") {
                        var i = document.createElement('input');
                        i.setAttribute('type', 'hidden');
                        i.setAttribute('name', key);
                        i.setAttribute(
                            'value',
                            ICP_OBJ_DETAIL[key] ? ICP_OBJ_DETAIL[key].toString() : ''
                        );
                        f.appendChild(i);
                    } else{
						var i = document.createElement('input');
                        i.setAttribute('type', 'hidden');
                        i.setAttribute('name', key);
                        i.setAttribute(
                            'value',
                            ICP_OBJ_DETAIL[key] && typeof(ICP_OBJ_DETAIL[key]) === "object" ? JSON.stringify(ICP_OBJ_DETAIL[key]) : ''
                        );
                        f.appendChild(i);
					}
                }
            }
            f.setAttribute('method', requestMethod);
            f.setAttribute('action', url);
            f.setAttribute('id', 'boltForm');
            f.setAttribute('target', targetBolt);
            document.body.appendChild(f);
            try {
                f.submit();
            } catch (e) {
                removeBolt();
                removeBoltLoader();
                catchExceptionHandler(
                    'Payment processing failed. Please try again later'
                );
            }
            if (boltiOS || boltiPad) {
                window.scrollTo(0, 0);
                boltIphonCssApply();
            }
            removeBoltForm();
        }
		function responseMode(mode) {
			try {
				setTimeout(function () {
					function dropMode(m) {
						return m.replace(/\s/g, '').toLowerCase() != 'dropout';
					}
					dropIn = mode ? dropMode(mode) : true;
				}, 0);
			} catch (e) {
				dropIn = true;
			}
		}
		function ICPconfData(isCheckoutExpress) {
			// Keeping id same for express and bolt otherwise launch will be called twice and iframe will be nested.
			iframeRef = document.getElementById('boltFrame');
			function getBoltObj(data) {
				return data;
			}
			if (
				isBoltCached &&
				iframeRef &&
				JSON.stringify(ICPconfTemp) === JSON.stringify(request)
			) {
				ICPconf = getBoltObj(ICPconfTemp);
			} else {
				// no need to run validation for express as all keys are going in data string which does not need validation for mandatory keys
				var ICPconf = !isCheckoutExpress && validator();
				// request is merchant request object
				var ICPconf = request;
				ICPconfTemp = ICPconf ? getBoltObj(ICPconf) : null;
				isBoltCached = false;
			}
			return {
				ICPconf: ICPconf,
				isBoltCached: isBoltCached,
			};
		}

		function appendLoader() {
			var myElem = document.getElementById('icpLoader');
			var loading = document.getElementById('imageLoaderImg');
			if (!myElem) {
				var body = document.body,
					html = document.documentElement;
				var BodyHeight = Math.max(
					body.scrollHeight,
					body.offsetHeight,
					html.clientHeight,
					html.scrollHeight,
					html.offsetHeight
				);
				var imageLoader = document.createElement('div');
				imageLoader.id = 'icpLoader';
				if (!boltMacOs)
					imageLoader.setAttribute(
						'style',
						'height:' +
							BodyHeight +
							'px;display:block;position:absolute;width:100%;top:0;z-index:10000;overflow:hidden;background:rgba(0, 0, 0, 0.75);'
					);
				else
					imageLoader.setAttribute(
						'style',
						'height:' +
							BodyHeight +
							'px;display:block;position:fixed;width:100%;top:0;z-index:10000;overflow:hidden;background:rgba(0, 0, 0, 0.6);'
					);
				var imageLoaderImg = document.createElement('div');
				imageLoaderImg.id = 'imageLoaderImg';
				imageLoaderImg.setAttribute(
					'style',
					'height:' +
						screen.height +
						'px;display:block;position:fixed;width:100%;left:0;z-index:10000;overflow:hidden;background:url(' +
						boltDomainName +
						'/static/kiwi/images/oval.svg) center 45% no-repeat;'
				);
				imageLoader.appendChild(imageLoaderImg);
				if (bolt_invoice) {
					var invoiceLoaderRef = document.getElementById('invoiceLoader');
					if (invoiceLoaderRef) {
						try {
							invoiceLoaderRef.parentNode.removeChild(invoiceLoaderRef);
							invoiceLoaderRef.removeChild(invoiceLoaderRef);
						} catch (e) {}
					}
				}
				document.body.appendChild(imageLoader);
			} else {
				loading.style.display = 'block';
				myElem.style.display = 'block';
			}
			loaderImgRef = loading;
			loaderRef = myElem;
		}

		function validator() {
			var isValidRequest = true;
			var keys = [
				'key',
				'txnid',
				'hash',
				'amount',
				'firstname',
				'email',
				'phone',
				'productinfo',
				'surl',
				'furl',
			];
			// only return keys
			var validateKeys = (function () {
				return keys;
			})();
			var valid = {
				str: function (val) {
					return typeof val === 'string' && val != '';
				},
				onlyString: function (val) {
					return {
						flg: valid.str(val),
						msg: 'should be string',
					};
				},
				key: function (val) {
					return valid.onlyString(val);
				},
				txnid: function (val) {
					return valid.onlyString(val);
				},
				hash: function (val) {
					return valid.onlyString(val);
				},
				amount: function (val) {
					return {
						flg: /(^\d+\.\d*$)|(^\d*\.\d+$)|(^\d+\.\d+$)|(^\d+$)/.test(val),
						msg: 'should be numeric',
					};
				},
				firstname: function (val) {
					return valid.onlyString(val);
				},
				email: function (val) {
					var e =
						/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-zA-Z]{2,6}(?:\.[a-zA-Z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/;
					return {
						flg: true,
						msg: 'is invalid',
					};
				},
				phone: function (val) {
					return {
						flg: true,
						msg: 'is invalid',
					};
				},
				productinfo: function (val) {
					return valid.onlyString(val);
				},
				surl: function (val) {
					return valid.onlyString(val);
				},
				furl: function (val) {
					return valid.onlyString(val);
				},
				merchantId: function (val) {
					return valid.onlyString(val);
				},
				invoiceId: function (val) {
					return valid.onlyString(val);
				},
				eventId: function (val) {
					return {
						flg: /^\d+$/.test(val),
						msg: 'should be numeric',
					};
				},
				ticketPurchaseList: function (val) {
					return valid.onlyString(val);
				},
				customFormData: function (val) {
					return valid.onlyString(val);
				},
			};
			for (var i = 0; i < validateKeys.length; i++) {
				if (validateKeys[i] in request) {
					var isValid = valid[validateKeys[i]];
					isValid = isValid(request[validateKeys[i]]);
					if (!isValid.flg) {
						catchExceptionHandler(validateKeys[i] + ': ' + isValid.msg);
						return (isValidRequest = false);
					}
				} else {
					catchExceptionHandler(
						validateKeys[i] + ': mandatory param is missing'
					);
					return (isValidRequest = false);
				}
			}
			return isValidRequest ? request : null;
		}
        // function to remove body overflow: hidden property after iframe closed so that parent window can scroll as before
		function removeBodyOverflow(event){
			if(event === 'bolt-close' || event === 'bolt-cancel' || event === 'bolt-ohFish' || event === 'bolt-cached'){
				const iframeBodyContainer = document.getElementsByTagName('body');
				if(iframeBodyContainer && iframeBodyContainer[0]){
					iframeBodyContainer[0].style.overflow = curOverflow;
				}
			}
		}
		var addEventMethod = window.addEventListener
			? 'addEventListener'
			: 'attachEvent';
		var addEventer = window[addEventMethod];
		var removeEventMethod = window.removeEventListener
			? 'removeEventListener'
			: 'detachEvent';
		var removeEventer = window[removeEventMethod];
		var messageEvent =
			addEventMethod == 'attachEvent' ? 'onmessage' : 'message';
		// Listen to message from child window
		addEventer(messageEvent, onMessageListener, false);
		function onMessageListener(e) {
			var key = e.message ? 'message' : 'data';
			var data =
				e[key] && typeof e[key] == 'string' ? JSON.parse(e[key]) : e[key];
			var evt = data.evt;
			var domainName = data.domain;
			delete data.evt;
			var eventHandler = configObj && configObj.eventHandler;
			iframeRef = document.getElementById('boltFrame');
			if (iframeRef !== undefined) {
				iframeRef.scrolling = 'no';
			}
			loaderRef = document.getElementById('icpLoader');
			loaderImgRef = document.getElementById('imageLoaderImg');
			delete ICPconfTemp.service_provider;
			delete ICPconfTemp.boltEnabled;
			delete ICPconfTemp.color;
			delete ICPconfTemp.logo;
			removeBodyOverflow(evt);
			switch (evt) {
                case 'bolt-execute-callback':
                    const callback = convertStringToFunction(data.callback);
					const callbackParam = {
						iframeRef: iframeRef, 
						boltPayId: data.boltId,
						origin: origin
					}
                    callback(callbackParam)
                    break;
				case 'bolt-close':
					isBoltCached = false;
					delete data.evt;
					data.txnStatus = data?.status === 'success' ? 'SUCCESS' : 'FAILED';
					data.txnMessage =
						data?.status === 'success'
							? 'Transaction Successful'
							: data.error_Message;
					boltPayId = null;
					removeBolt();
					if (dropIn) {
						removeBoltLoader();
						if ((boltiOS && boltMob) || boltiPad) {
							boltIphoneCssRemove();
						}
						paymentResponseHandler(data);
					} else {
						dropOutPaymentResponseHandler(data);
					}
					removeEventer(messageEvent, onMessageListener, false);
					break;
				case 'bolt-cancel':
					isBoltCached = true;
					delete data.evt;
					boltPayId = data.boltId;
					data.txnStatus = 'CANCEL';
					data.txnMessage = data.boltMsg;
					delete data.boltMsg;
					delete data.boltId;
					loaderRef.style.display = 'none';
					iframeRef.style.display = 'none';
					if ((boltiOS && boltMob) || boltiPad) {
						boltIphoneCssRemove();
					}
					paymentResponseHandler(data);
					removeEventer(messageEvent, onMessageListener, false);
					break;
				case 'bolt-launched':
					if (iframeRef) {
						iframeRef.style.visibility = 'visible';
						if (loaderImgRef) {
							loaderImgRef.style.display = 'none';
						}
						if (iframeRef.contentWindow) {
							try {
								iframeRef.contentWindow.focus();
							} catch (e) {}
						}
					}
					break;
				case 'bolt-cached':
					isBoltCached = true;
					break;
				case 'bolt-ohFish':
					removeBolt();
					removeBoltLoader();
					if ((boltiOS && boltMob) || boltiPad) {
						boltIphoneCssRemove();
					}
					catchExceptionHandler(data.errMsg);
					break;
				case 'bolt-previous-id':
					try {
						if (boltPayId) {
							iframeRef.contentWindow.postMessage(
								{
									evt: 'new',
									id: boltPayId,
								},
								`${origin}`
							);
						}
					} catch (e) {}
					break;
                case 'express-launched':
                try {
                    const expressOrigin = '*';
                    iframeRef.contentWindow.postMessage(
                        {
                            evt: 'expressLaunched',
                            id: boltPayId,
                            payload: ICPconfTemp,
                        },
                        `${expressOrigin}`
                    );
                } catch (e) {console.log("error while express-launched", e)}
                break;
                case 'express-checkout-clicked':
                try {
                    if(iframeRef !== null){
						// data.payload coming from merchant is the payment request to hit _payments 
						// check if miphpayid can be passed in payload
						const icpPayloadFromExpress = { ...data?.payload?.payload , icp_source: "express", isCheckoutExpress: false}
                        boltAndExpressHandler(icpPayloadFromExpress);
                    }
                } catch (e) {console.log("error while express-checkout-clicked", e)}
                break;
				default:
					return;
			}
		}
		function createBoltFr() {
			var customClass =
				arguments.length > 0 && arguments[0] !== undefined
					? arguments[0]
					: false;
			boltIframe = document.createElement('iframe');
			boltIframe.name = 'boltFrame';
			boltIframe.id = 'boltFrame';
			if (customClass) {
				boltIframe.setAttribute('class', customClass);
			}
			boltIframe.setAttribute('style', boltIProp);
			boltIframe.setAttribute('allowtransparency', 'true');
			boltIframe.setAttribute('frameborder', '0');
		}
		function boltIphonCssApply() {
			var head = document.head || document.getElementsByTagName('head')[0];
			boltIphoneCss.type = 'text/css';
			boltIphoneCss.id = 'boltIphone';
			if (boltIphoneCss.styleSheet) {
				boltIphoneCss.styleSheet.cssText =
					'body {overflow: hidden !important;}';
			} else {
				boltIphoneCss.appendChild(
					document.createTextNode('body {overflow: hidden !important;}')
				);
			}
			head.appendChild(boltIphoneCss);
		}
		// isBoltEnabledFallBack
		function dropOutPaymentResponseHandler(response) {
			var successResp = response.txnStatus == 'SUCCESS';
			var url = '';
			if (successResp) {
				url = response.surl ? response.surl : response.postUrl;
			} else {
				url = response.furl ? response.furl : response.postUrl;
			}
			if (url != '' && !url.startsWith('http')) {
				url = 'http://' + url;
			}
			var f = document.createElement('form');
			f.setAttribute('method', 'POST');
			f.setAttribute('action', url);
			for (var key in response) {
				var i = document.createElement('input');
				i.setAttribute('type', 'hidden');
				i.setAttribute('name', key);
				i.setAttribute('value', response[key]);
				f.appendChild(i);
			}
			document.body.appendChild(f);
			f.submit();
		}
		function paymentResponseHandler(data) {
			handler &&
				handler.responseHandler &&
				handler.responseHandler({
					response: data,
				});
		}
		function catchExceptionHandler(msg) {
			handler &&
				handler.catchException &&
				handler.catchException({
					message: msg,
				});
		}
		function removeBolt() {
			iframeRef = document.getElementById('boltFrame');
			removeBoltElm(iframeRef);
		}
		function removeBoltForm() {
			removeBoltElm(document.getElementById('boltForm'));
		}
		function removeBoltLoader() {
			loaderRef = document.getElementById('icpLoader');
			removeBoltElm(loaderRef);
		}

		function boltIphoneCssRemove() {
			var boltIphoneElm = document.getElementById('boltIphone');
			if (boltIphoneElm) {
				boltIphoneElm.innerHTML = '';
			}
			removeBoltElm(document.getElementById('boltIphone'));
		}
		function removeBoltElm(boltElm) {
			if (boltElm) {
				try {
					boltElm.parentNode.removeChild(boltElm);
				} catch (e) {}
				try {
					boltElm.removeChild(boltElm);
				} catch (e) {}
			}
		}
	}
	return {
		launch: launch,
		author: 'Surbhi Soni',
		version: '3.0-09.09.23',
	};
})();
window.bolt = bolt;
