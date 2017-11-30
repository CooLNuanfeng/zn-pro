'use strict';

// created by gpake
(function () {

    var config = {
        qiniuRegion: '',
        qiniuImageURLPrefix: '',
        qiniuUploadToken: '',
        qiniuUploadTokenURL: '',
        qiniuUploadTokenFunction: null,
        qiniuShouldUseQiniuFileName: false
    };

    module.exports = {
        init: init,
        upload: upload

        // 在整个程序生命周期中，只需要 init 一次即可
        // 如果需要变更参数，再调用 init 即可
    };function init(options) {
        config = {
            qiniuRegion: '',
            qiniuImageURLPrefix: '',
            qiniuUploadToken: '',
            qiniuUploadTokenURL: '',
            qiniuUploadTokenFunction: null,
            qiniuShouldUseQiniuFileName: false
        };
        updateConfigWithOptions(options);
    }

    function updateConfigWithOptions(options) {
        if (options.region) {
            config.qiniuRegion = options.region;
        } else {
            console.error('qiniu uploader need your bucket region');
        }
        if (options.uptoken) {
            config.qiniuUploadToken = options.uptoken;
        } else if (options.uptokenURL) {
            config.qiniuUploadTokenURL = options.uptokenURL;
        } else if (options.uptokenFunc) {
            config.qiniuUploadTokenFunction = options.uptokenFunc;
        }
        if (options.domain) {
            config.qiniuImageURLPrefix = options.domain;
        }
        config.qiniuShouldUseQiniuFileName = options.shouldUseQiniuFileName;
    }

    function upload(filePath, success, fail, options) {
        if (null == filePath) {
            console.error('qiniu uploader need filePath to upload');
            return;
        }
        if (options) {
            updateConfigWithOptions(options);
        }
        if (config.qiniuUploadToken) {
            doUpload(filePath, success, fail, options);
        } else if (config.qiniuUploadTokenURL) {
            getQiniuToken(function () {
                doUpload(filePath, success, fail, options);
            });
        } else if (config.qiniuUploadTokenFunction) {
            config.qiniuUploadToken = config.qiniuUploadTokenFunction();
            if (null == config.qiniuUploadToken && config.qiniuUploadToken.length > 0) {
                console.error('qiniu UploadTokenFunction result is null, please check the return value');
                return;
            }
        } else {
            console.error('qiniu uploader need one of [uptoken, uptokenURL, uptokenFunc]');
            return;
        }
    }

    function doUpload(filePath, _success, _fail, options) {
        if (null == config.qiniuUploadToken && config.qiniuUploadToken.length > 0) {
            console.error('qiniu UploadToken is null, please check the init config or networking');
            return;
        }
        var url = uploadURLFromRegionCode(config.qiniuRegion);
        var fileName = filePath.split('//')[1];
        if (options && options.key) {
            fileName = options.key;
        }
        var formData = {
            'token': config.qiniuUploadToken
        };
        if (!config.qiniuShouldUseQiniuFileName) {
            formData['key'] = fileName;
        }
        wx.uploadFile({
            url: url,
            filePath: filePath,
            name: 'file',
            formData: formData,
            success: function success(res) {
                var dataString = res.data;
                try {
                    var dataObject = JSON.parse(dataString);
                    //do something
                    var imageUrl = config.qiniuImageURLPrefix + '/' + dataObject.key;
                    dataObject.imageURL = imageUrl;
                    console.log(dataObject);
                    if (_success) {
                        _success(dataObject);
                    }
                } catch (e) {
                    console.log('parse JSON failed, origin String is: ' + dataString);
                    if (_fail) {
                        _fail(e);
                    }
                }
            },
            fail: function fail(error) {
                console.error(error);
                if (_fail) {
                    _fail(error);
                }
            }
        });
    }

    function getQiniuToken(callback) {
        wx.request({
            url: config.qiniuUploadTokenURL,
            success: function success(res) {
                var token = res.data.uptoken;
                if (token && token.length > 0) {
                    config.qiniuUploadToken = token;
                    if (callback) {
                        callback();
                    }
                } else {
                    console.error('qiniuUploader cannot get your token, please check the uptokenURL or server');
                }
            },
            fail: function fail(error) {
                console.error('qiniu UploadToken is null, please check the init config or networking: ' + error);
            }
        });
    }

    function uploadURLFromRegionCode(code) {
        var uploadURL = null;
        switch (code) {
            case 'ECN':
                uploadURL = 'https://up.qbox.me';break;
            case 'NCN':
                uploadURL = 'https://up-z1.qbox.me';break;
            case 'SCN':
                uploadURL = 'https://up-z2.qbox.me';break;
            case 'NA':
                uploadURL = 'https://up-na0.qbox.me';break;
            default:
                console.error('please make the region is with one of [ECN, SCN, NCN, NA]');
        }
        return uploadURL;
    }
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInFpbml1VXBsb2FkZXIuanMiXSwibmFtZXMiOlsiY29uZmlnIiwicWluaXVSZWdpb24iLCJxaW5pdUltYWdlVVJMUHJlZml4IiwicWluaXVVcGxvYWRUb2tlbiIsInFpbml1VXBsb2FkVG9rZW5VUkwiLCJxaW5pdVVwbG9hZFRva2VuRnVuY3Rpb24iLCJxaW5pdVNob3VsZFVzZVFpbml1RmlsZU5hbWUiLCJtb2R1bGUiLCJleHBvcnRzIiwiaW5pdCIsInVwbG9hZCIsIm9wdGlvbnMiLCJ1cGRhdGVDb25maWdXaXRoT3B0aW9ucyIsInJlZ2lvbiIsImNvbnNvbGUiLCJlcnJvciIsInVwdG9rZW4iLCJ1cHRva2VuVVJMIiwidXB0b2tlbkZ1bmMiLCJkb21haW4iLCJzaG91bGRVc2VRaW5pdUZpbGVOYW1lIiwiZmlsZVBhdGgiLCJzdWNjZXNzIiwiZmFpbCIsImRvVXBsb2FkIiwiZ2V0UWluaXVUb2tlbiIsImxlbmd0aCIsInVybCIsInVwbG9hZFVSTEZyb21SZWdpb25Db2RlIiwiZmlsZU5hbWUiLCJzcGxpdCIsImtleSIsImZvcm1EYXRhIiwid3giLCJ1cGxvYWRGaWxlIiwibmFtZSIsInJlcyIsImRhdGFTdHJpbmciLCJkYXRhIiwiZGF0YU9iamVjdCIsIkpTT04iLCJwYXJzZSIsImltYWdlVXJsIiwiaW1hZ2VVUkwiLCJsb2ciLCJlIiwiY2FsbGJhY2siLCJyZXF1ZXN0IiwidG9rZW4iLCJjb2RlIiwidXBsb2FkVVJMIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0EsQ0FBQyxZQUFXOztBQUVaLFFBQUlBLFNBQVM7QUFDVEMscUJBQWEsRUFESjtBQUVUQyw2QkFBcUIsRUFGWjtBQUdUQywwQkFBa0IsRUFIVDtBQUlUQyw2QkFBcUIsRUFKWjtBQUtUQyxrQ0FBMEIsSUFMakI7QUFNVEMscUNBQTZCO0FBTnBCLEtBQWI7O0FBU0FDLFdBQU9DLE9BQVAsR0FBaUI7QUFDYkMsY0FBTUEsSUFETztBQUViQyxnQkFBUUE7O0FBR1o7QUFDQTtBQU5pQixLQUFqQixDQU9BLFNBQVNELElBQVQsQ0FBY0UsT0FBZCxFQUF1QjtBQUNuQlgsaUJBQVM7QUFDTEMseUJBQWEsRUFEUjtBQUVMQyxpQ0FBcUIsRUFGaEI7QUFHTEMsOEJBQWtCLEVBSGI7QUFJTEMsaUNBQXFCLEVBSmhCO0FBS0xDLHNDQUEwQixJQUxyQjtBQU1MQyx5Q0FBNkI7QUFOeEIsU0FBVDtBQVFBTSxnQ0FBd0JELE9BQXhCO0FBQ0g7O0FBRUQsYUFBU0MsdUJBQVQsQ0FBaUNELE9BQWpDLEVBQTBDO0FBQ3RDLFlBQUlBLFFBQVFFLE1BQVosRUFBb0I7QUFDaEJiLG1CQUFPQyxXQUFQLEdBQXFCVSxRQUFRRSxNQUE3QjtBQUNILFNBRkQsTUFFTztBQUNIQyxvQkFBUUMsS0FBUixDQUFjLHdDQUFkO0FBQ0g7QUFDRCxZQUFJSixRQUFRSyxPQUFaLEVBQXFCO0FBQ2pCaEIsbUJBQU9HLGdCQUFQLEdBQTBCUSxRQUFRSyxPQUFsQztBQUNILFNBRkQsTUFFTyxJQUFJTCxRQUFRTSxVQUFaLEVBQXdCO0FBQzNCakIsbUJBQU9JLG1CQUFQLEdBQTZCTyxRQUFRTSxVQUFyQztBQUNILFNBRk0sTUFFQSxJQUFHTixRQUFRTyxXQUFYLEVBQXdCO0FBQzNCbEIsbUJBQU9LLHdCQUFQLEdBQWtDTSxRQUFRTyxXQUExQztBQUNIO0FBQ0QsWUFBSVAsUUFBUVEsTUFBWixFQUFvQjtBQUNoQm5CLG1CQUFPRSxtQkFBUCxHQUE2QlMsUUFBUVEsTUFBckM7QUFDSDtBQUNEbkIsZUFBT00sMkJBQVAsR0FBcUNLLFFBQVFTLHNCQUE3QztBQUNIOztBQUVELGFBQVNWLE1BQVQsQ0FBZ0JXLFFBQWhCLEVBQTBCQyxPQUExQixFQUFtQ0MsSUFBbkMsRUFBeUNaLE9BQXpDLEVBQWtEO0FBQzlDLFlBQUksUUFBUVUsUUFBWixFQUFzQjtBQUNsQlAsb0JBQVFDLEtBQVIsQ0FBYyx3Q0FBZDtBQUNBO0FBQ0g7QUFDRCxZQUFJSixPQUFKLEVBQWE7QUFDWEMsb0NBQXdCRCxPQUF4QjtBQUNEO0FBQ0QsWUFBSVgsT0FBT0csZ0JBQVgsRUFBNkI7QUFDekJxQixxQkFBU0gsUUFBVCxFQUFtQkMsT0FBbkIsRUFBNEJDLElBQTVCLEVBQWtDWixPQUFsQztBQUNILFNBRkQsTUFFTyxJQUFJWCxPQUFPSSxtQkFBWCxFQUFnQztBQUNuQ3FCLDBCQUFjLFlBQVc7QUFDckJELHlCQUFTSCxRQUFULEVBQW1CQyxPQUFuQixFQUE0QkMsSUFBNUIsRUFBa0NaLE9BQWxDO0FBQ0gsYUFGRDtBQUdILFNBSk0sTUFJQSxJQUFJWCxPQUFPSyx3QkFBWCxFQUFxQztBQUN4Q0wsbUJBQU9HLGdCQUFQLEdBQTBCSCxPQUFPSyx3QkFBUCxFQUExQjtBQUNBLGdCQUFJLFFBQVFMLE9BQU9HLGdCQUFmLElBQW1DSCxPQUFPRyxnQkFBUCxDQUF3QnVCLE1BQXhCLEdBQWlDLENBQXhFLEVBQTJFO0FBQ3ZFWix3QkFBUUMsS0FBUixDQUFjLHlFQUFkO0FBQ0E7QUFDSDtBQUNKLFNBTk0sTUFNQTtBQUNIRCxvQkFBUUMsS0FBUixDQUFjLCtEQUFkO0FBQ0E7QUFDSDtBQUNKOztBQUVELGFBQVNTLFFBQVQsQ0FBa0JILFFBQWxCLEVBQTRCQyxRQUE1QixFQUFxQ0MsS0FBckMsRUFBMkNaLE9BQTNDLEVBQW9EO0FBQ2hELFlBQUksUUFBUVgsT0FBT0csZ0JBQWYsSUFBbUNILE9BQU9HLGdCQUFQLENBQXdCdUIsTUFBeEIsR0FBaUMsQ0FBeEUsRUFBMkU7QUFDdkVaLG9CQUFRQyxLQUFSLENBQWMsdUVBQWQ7QUFDQTtBQUNIO0FBQ0QsWUFBSVksTUFBTUMsd0JBQXdCNUIsT0FBT0MsV0FBL0IsQ0FBVjtBQUNBLFlBQUk0QixXQUFXUixTQUFTUyxLQUFULENBQWUsSUFBZixFQUFxQixDQUFyQixDQUFmO0FBQ0EsWUFBSW5CLFdBQVdBLFFBQVFvQixHQUF2QixFQUE0QjtBQUN4QkYsdUJBQVdsQixRQUFRb0IsR0FBbkI7QUFDSDtBQUNELFlBQUlDLFdBQVc7QUFDWCxxQkFBU2hDLE9BQU9HO0FBREwsU0FBZjtBQUdBLFlBQUksQ0FBQ0gsT0FBT00sMkJBQVosRUFBeUM7QUFDdkMwQixxQkFBUyxLQUFULElBQWtCSCxRQUFsQjtBQUNEO0FBQ0RJLFdBQUdDLFVBQUgsQ0FBYztBQUNWUCxpQkFBS0EsR0FESztBQUVWTixzQkFBVUEsUUFGQTtBQUdWYyxrQkFBTSxNQUhJO0FBSVZILHNCQUFVQSxRQUpBO0FBS1ZWLHFCQUFTLGlCQUFVYyxHQUFWLEVBQWU7QUFDdEIsb0JBQUlDLGFBQWFELElBQUlFLElBQXJCO0FBQ0Esb0JBQUk7QUFDRix3QkFBSUMsYUFBYUMsS0FBS0MsS0FBTCxDQUFXSixVQUFYLENBQWpCO0FBQ0E7QUFDQSx3QkFBSUssV0FBVzFDLE9BQU9FLG1CQUFQLEdBQTZCLEdBQTdCLEdBQW1DcUMsV0FBV1IsR0FBN0Q7QUFDQVEsK0JBQVdJLFFBQVgsR0FBc0JELFFBQXRCO0FBQ0E1Qiw0QkFBUThCLEdBQVIsQ0FBWUwsVUFBWjtBQUNBLHdCQUFJakIsUUFBSixFQUFhO0FBQ1hBLGlDQUFRaUIsVUFBUjtBQUNEO0FBQ0YsaUJBVEQsQ0FTRSxPQUFNTSxDQUFOLEVBQVM7QUFDVC9CLDRCQUFROEIsR0FBUixDQUFZLDBDQUEwQ1AsVUFBdEQ7QUFDQSx3QkFBSWQsS0FBSixFQUFVO0FBQ1JBLDhCQUFLc0IsQ0FBTDtBQUNEO0FBQ0Y7QUFDRixhQXRCUztBQXVCVnRCLGtCQUFNLGNBQVVSLEtBQVYsRUFBaUI7QUFDbkJELHdCQUFRQyxLQUFSLENBQWNBLEtBQWQ7QUFDQSxvQkFBSVEsS0FBSixFQUFVO0FBQ05BLDBCQUFLUixLQUFMO0FBQ0g7QUFDSjtBQTVCUyxTQUFkO0FBOEJIOztBQUVELGFBQVNVLGFBQVQsQ0FBdUJxQixRQUF2QixFQUFpQztBQUMvQmIsV0FBR2MsT0FBSCxDQUFXO0FBQ1RwQixpQkFBSzNCLE9BQU9JLG1CQURIO0FBRVRrQixxQkFBUyxpQkFBVWMsR0FBVixFQUFlO0FBQ3RCLG9CQUFJWSxRQUFRWixJQUFJRSxJQUFKLENBQVN0QixPQUFyQjtBQUNBLG9CQUFJZ0MsU0FBU0EsTUFBTXRCLE1BQU4sR0FBZSxDQUE1QixFQUErQjtBQUM3QjFCLDJCQUFPRyxnQkFBUCxHQUEwQjZDLEtBQTFCO0FBQ0Esd0JBQUlGLFFBQUosRUFBYztBQUNWQTtBQUNIO0FBQ0YsaUJBTEQsTUFLTztBQUNMaEMsNEJBQVFDLEtBQVIsQ0FBYyw0RUFBZDtBQUNEO0FBQ0YsYUFaUTtBQWFUUSxrQkFBTSxjQUFVUixLQUFWLEVBQWlCO0FBQ3JCRCx3QkFBUUMsS0FBUixDQUFjLDRFQUE0RUEsS0FBMUY7QUFDRDtBQWZRLFNBQVg7QUFpQkQ7O0FBRUQsYUFBU2EsdUJBQVQsQ0FBaUNxQixJQUFqQyxFQUF1QztBQUNuQyxZQUFJQyxZQUFZLElBQWhCO0FBQ0EsZ0JBQU9ELElBQVA7QUFDSSxpQkFBSyxLQUFMO0FBQVlDLDRCQUFZLG9CQUFaLENBQWtDO0FBQzlDLGlCQUFLLEtBQUw7QUFBWUEsNEJBQVksdUJBQVosQ0FBcUM7QUFDakQsaUJBQUssS0FBTDtBQUFZQSw0QkFBWSx1QkFBWixDQUFxQztBQUNqRCxpQkFBSyxJQUFMO0FBQVdBLDRCQUFZLHdCQUFaLENBQXNDO0FBQ2pEO0FBQVNwQyx3QkFBUUMsS0FBUixDQUFjLDJEQUFkO0FBTGI7QUFPQSxlQUFPbUMsU0FBUDtBQUNIO0FBRUEsQ0EzSkQiLCJmaWxlIjoicWluaXVVcGxvYWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGNyZWF0ZWQgYnkgZ3Bha2VcbihmdW5jdGlvbigpIHtcblxudmFyIGNvbmZpZyA9IHtcbiAgICBxaW5pdVJlZ2lvbjogJycsXG4gICAgcWluaXVJbWFnZVVSTFByZWZpeDogJycsXG4gICAgcWluaXVVcGxvYWRUb2tlbjogJycsXG4gICAgcWluaXVVcGxvYWRUb2tlblVSTDogJycsXG4gICAgcWluaXVVcGxvYWRUb2tlbkZ1bmN0aW9uOiBudWxsLFxuICAgIHFpbml1U2hvdWxkVXNlUWluaXVGaWxlTmFtZTogZmFsc2Vcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaW5pdDogaW5pdCxcbiAgICB1cGxvYWQ6IHVwbG9hZCxcbn1cblxuLy8g5Zyo5pW05Liq56iL5bqP55Sf5ZG95ZGo5pyf5Lit77yM5Y+q6ZyA6KaBIGluaXQg5LiA5qyh5Y2z5Y+vXG4vLyDlpoLmnpzpnIDopoHlj5jmm7Tlj4LmlbDvvIzlho3osIPnlKggaW5pdCDljbPlj69cbmZ1bmN0aW9uIGluaXQob3B0aW9ucykge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgcWluaXVSZWdpb246ICcnLFxuICAgICAgICBxaW5pdUltYWdlVVJMUHJlZml4OiAnJyxcbiAgICAgICAgcWluaXVVcGxvYWRUb2tlbjogJycsXG4gICAgICAgIHFpbml1VXBsb2FkVG9rZW5VUkw6ICcnLFxuICAgICAgICBxaW5pdVVwbG9hZFRva2VuRnVuY3Rpb246IG51bGwsXG4gICAgICAgIHFpbml1U2hvdWxkVXNlUWluaXVGaWxlTmFtZTogZmFsc2VcbiAgICB9O1xuICAgIHVwZGF0ZUNvbmZpZ1dpdGhPcHRpb25zKG9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVDb25maWdXaXRoT3B0aW9ucyhvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMucmVnaW9uKSB7XG4gICAgICAgIGNvbmZpZy5xaW5pdVJlZ2lvbiA9IG9wdGlvbnMucmVnaW9uO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ3Fpbml1IHVwbG9hZGVyIG5lZWQgeW91ciBidWNrZXQgcmVnaW9uJyk7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnVwdG9rZW4pIHtcbiAgICAgICAgY29uZmlnLnFpbml1VXBsb2FkVG9rZW4gPSBvcHRpb25zLnVwdG9rZW47XG4gICAgfSBlbHNlIGlmIChvcHRpb25zLnVwdG9rZW5VUkwpIHtcbiAgICAgICAgY29uZmlnLnFpbml1VXBsb2FkVG9rZW5VUkwgPSBvcHRpb25zLnVwdG9rZW5VUkw7XG4gICAgfSBlbHNlIGlmKG9wdGlvbnMudXB0b2tlbkZ1bmMpIHtcbiAgICAgICAgY29uZmlnLnFpbml1VXBsb2FkVG9rZW5GdW5jdGlvbiA9IG9wdGlvbnMudXB0b2tlbkZ1bmM7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmRvbWFpbikge1xuICAgICAgICBjb25maWcucWluaXVJbWFnZVVSTFByZWZpeCA9IG9wdGlvbnMuZG9tYWluO1xuICAgIH1cbiAgICBjb25maWcucWluaXVTaG91bGRVc2VRaW5pdUZpbGVOYW1lID0gb3B0aW9ucy5zaG91bGRVc2VRaW5pdUZpbGVOYW1lXG59XG5cbmZ1bmN0aW9uIHVwbG9hZChmaWxlUGF0aCwgc3VjY2VzcywgZmFpbCwgb3B0aW9ucykge1xuICAgIGlmIChudWxsID09IGZpbGVQYXRoKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ3Fpbml1IHVwbG9hZGVyIG5lZWQgZmlsZVBhdGggdG8gdXBsb2FkJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgIHVwZGF0ZUNvbmZpZ1dpdGhPcHRpb25zKG9wdGlvbnMpO1xuICAgIH1cbiAgICBpZiAoY29uZmlnLnFpbml1VXBsb2FkVG9rZW4pIHtcbiAgICAgICAgZG9VcGxvYWQoZmlsZVBhdGgsIHN1Y2Nlc3MsIGZhaWwsIG9wdGlvbnMpO1xuICAgIH0gZWxzZSBpZiAoY29uZmlnLnFpbml1VXBsb2FkVG9rZW5VUkwpIHtcbiAgICAgICAgZ2V0UWluaXVUb2tlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRvVXBsb2FkKGZpbGVQYXRoLCBzdWNjZXNzLCBmYWlsLCBvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChjb25maWcucWluaXVVcGxvYWRUb2tlbkZ1bmN0aW9uKSB7XG4gICAgICAgIGNvbmZpZy5xaW5pdVVwbG9hZFRva2VuID0gY29uZmlnLnFpbml1VXBsb2FkVG9rZW5GdW5jdGlvbigpO1xuICAgICAgICBpZiAobnVsbCA9PSBjb25maWcucWluaXVVcGxvYWRUb2tlbiAmJiBjb25maWcucWluaXVVcGxvYWRUb2tlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdxaW5pdSBVcGxvYWRUb2tlbkZ1bmN0aW9uIHJlc3VsdCBpcyBudWxsLCBwbGVhc2UgY2hlY2sgdGhlIHJldHVybiB2YWx1ZScpO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdxaW5pdSB1cGxvYWRlciBuZWVkIG9uZSBvZiBbdXB0b2tlbiwgdXB0b2tlblVSTCwgdXB0b2tlbkZ1bmNdJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRvVXBsb2FkKGZpbGVQYXRoLCBzdWNjZXNzLCBmYWlsLCBvcHRpb25zKSB7XG4gICAgaWYgKG51bGwgPT0gY29uZmlnLnFpbml1VXBsb2FkVG9rZW4gJiYgY29uZmlnLnFpbml1VXBsb2FkVG9rZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdxaW5pdSBVcGxvYWRUb2tlbiBpcyBudWxsLCBwbGVhc2UgY2hlY2sgdGhlIGluaXQgY29uZmlnIG9yIG5ldHdvcmtpbmcnKTtcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHZhciB1cmwgPSB1cGxvYWRVUkxGcm9tUmVnaW9uQ29kZShjb25maWcucWluaXVSZWdpb24pO1xuICAgIHZhciBmaWxlTmFtZSA9IGZpbGVQYXRoLnNwbGl0KCcvLycpWzFdO1xuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMua2V5KSB7XG4gICAgICAgIGZpbGVOYW1lID0gb3B0aW9ucy5rZXk7XG4gICAgfVxuICAgIHZhciBmb3JtRGF0YSA9IHtcbiAgICAgICAgJ3Rva2VuJzogY29uZmlnLnFpbml1VXBsb2FkVG9rZW5cbiAgICB9O1xuICAgIGlmICghY29uZmlnLnFpbml1U2hvdWxkVXNlUWluaXVGaWxlTmFtZSkge1xuICAgICAgZm9ybURhdGFbJ2tleSddID0gZmlsZU5hbWVcbiAgICB9XG4gICAgd3gudXBsb2FkRmlsZSh7XG4gICAgICAgIHVybDogdXJsLFxuICAgICAgICBmaWxlUGF0aDogZmlsZVBhdGgsXG4gICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgZm9ybURhdGE6IGZvcm1EYXRhLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgdmFyIGRhdGFTdHJpbmcgPSByZXMuZGF0YVxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgZGF0YU9iamVjdCA9IEpTT04ucGFyc2UoZGF0YVN0cmluZyk7XG4gICAgICAgICAgICAvL2RvIHNvbWV0aGluZ1xuICAgICAgICAgICAgdmFyIGltYWdlVXJsID0gY29uZmlnLnFpbml1SW1hZ2VVUkxQcmVmaXggKyAnLycgKyBkYXRhT2JqZWN0LmtleTtcbiAgICAgICAgICAgIGRhdGFPYmplY3QuaW1hZ2VVUkwgPSBpbWFnZVVybDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGFPYmplY3QpO1xuICAgICAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgc3VjY2VzcyhkYXRhT2JqZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwYXJzZSBKU09OIGZhaWxlZCwgb3JpZ2luIFN0cmluZyBpczogJyArIGRhdGFTdHJpbmcpXG4gICAgICAgICAgICBpZiAoZmFpbCkge1xuICAgICAgICAgICAgICBmYWlsKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIGlmIChmYWlsKSB7XG4gICAgICAgICAgICAgICAgZmFpbChlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5mdW5jdGlvbiBnZXRRaW5pdVRva2VuKGNhbGxiYWNrKSB7XG4gIHd4LnJlcXVlc3Qoe1xuICAgIHVybDogY29uZmlnLnFpbml1VXBsb2FkVG9rZW5VUkwsXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgdmFyIHRva2VuID0gcmVzLmRhdGEudXB0b2tlbjtcbiAgICAgIGlmICh0b2tlbiAmJiB0b2tlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbmZpZy5xaW5pdVVwbG9hZFRva2VuID0gdG9rZW47XG4gICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcigncWluaXVVcGxvYWRlciBjYW5ub3QgZ2V0IHlvdXIgdG9rZW4sIHBsZWFzZSBjaGVjayB0aGUgdXB0b2tlblVSTCBvciBzZXJ2ZXInKVxuICAgICAgfVxuICAgIH0sXG4gICAgZmFpbDogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdxaW5pdSBVcGxvYWRUb2tlbiBpcyBudWxsLCBwbGVhc2UgY2hlY2sgdGhlIGluaXQgY29uZmlnIG9yIG5ldHdvcmtpbmc6ICcgKyBlcnJvcik7XG4gICAgfVxuICB9KVxufVxuXG5mdW5jdGlvbiB1cGxvYWRVUkxGcm9tUmVnaW9uQ29kZShjb2RlKSB7XG4gICAgdmFyIHVwbG9hZFVSTCA9IG51bGw7XG4gICAgc3dpdGNoKGNvZGUpIHtcbiAgICAgICAgY2FzZSAnRUNOJzogdXBsb2FkVVJMID0gJ2h0dHBzOi8vdXAucWJveC5tZSc7IGJyZWFrO1xuICAgICAgICBjYXNlICdOQ04nOiB1cGxvYWRVUkwgPSAnaHR0cHM6Ly91cC16MS5xYm94Lm1lJzsgYnJlYWs7XG4gICAgICAgIGNhc2UgJ1NDTic6IHVwbG9hZFVSTCA9ICdodHRwczovL3VwLXoyLnFib3gubWUnOyBicmVhaztcbiAgICAgICAgY2FzZSAnTkEnOiB1cGxvYWRVUkwgPSAnaHR0cHM6Ly91cC1uYTAucWJveC5tZSc7IGJyZWFrO1xuICAgICAgICBkZWZhdWx0OiBjb25zb2xlLmVycm9yKCdwbGVhc2UgbWFrZSB0aGUgcmVnaW9uIGlzIHdpdGggb25lIG9mIFtFQ04sIFNDTiwgTkNOLCBOQV0nKTtcbiAgICB9XG4gICAgcmV0dXJuIHVwbG9hZFVSTDtcbn1cblxufSkoKTsiXX0=