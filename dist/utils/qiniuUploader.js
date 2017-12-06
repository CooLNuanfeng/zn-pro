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
                    // console.log(dataObject);
                    if (_success) {
                        _success(dataObject);
                    }
                } catch (e) {
                    // console.log('parse JSON failed, origin String is: ' + dataString)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInFpbml1VXBsb2FkZXIuanMiXSwibmFtZXMiOlsiY29uZmlnIiwicWluaXVSZWdpb24iLCJxaW5pdUltYWdlVVJMUHJlZml4IiwicWluaXVVcGxvYWRUb2tlbiIsInFpbml1VXBsb2FkVG9rZW5VUkwiLCJxaW5pdVVwbG9hZFRva2VuRnVuY3Rpb24iLCJxaW5pdVNob3VsZFVzZVFpbml1RmlsZU5hbWUiLCJtb2R1bGUiLCJleHBvcnRzIiwiaW5pdCIsInVwbG9hZCIsIm9wdGlvbnMiLCJ1cGRhdGVDb25maWdXaXRoT3B0aW9ucyIsInJlZ2lvbiIsImNvbnNvbGUiLCJlcnJvciIsInVwdG9rZW4iLCJ1cHRva2VuVVJMIiwidXB0b2tlbkZ1bmMiLCJkb21haW4iLCJzaG91bGRVc2VRaW5pdUZpbGVOYW1lIiwiZmlsZVBhdGgiLCJzdWNjZXNzIiwiZmFpbCIsImRvVXBsb2FkIiwiZ2V0UWluaXVUb2tlbiIsImxlbmd0aCIsInVybCIsInVwbG9hZFVSTEZyb21SZWdpb25Db2RlIiwiZmlsZU5hbWUiLCJzcGxpdCIsImtleSIsImZvcm1EYXRhIiwid3giLCJ1cGxvYWRGaWxlIiwibmFtZSIsInJlcyIsImRhdGFTdHJpbmciLCJkYXRhIiwiZGF0YU9iamVjdCIsIkpTT04iLCJwYXJzZSIsImltYWdlVXJsIiwiaW1hZ2VVUkwiLCJlIiwiY2FsbGJhY2siLCJyZXF1ZXN0IiwidG9rZW4iLCJjb2RlIiwidXBsb2FkVVJMIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0EsQ0FBQyxZQUFXOztBQUVaLFFBQUlBLFNBQVM7QUFDVEMscUJBQWEsRUFESjtBQUVUQyw2QkFBcUIsRUFGWjtBQUdUQywwQkFBa0IsRUFIVDtBQUlUQyw2QkFBcUIsRUFKWjtBQUtUQyxrQ0FBMEIsSUFMakI7QUFNVEMscUNBQTZCO0FBTnBCLEtBQWI7O0FBU0FDLFdBQU9DLE9BQVAsR0FBaUI7QUFDYkMsY0FBTUEsSUFETztBQUViQyxnQkFBUUE7O0FBR1o7QUFDQTtBQU5pQixLQUFqQixDQU9BLFNB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LE1BS087QUFDTC9CLDRCQUFRQyxLQUFSLENBQWMsNEVBQWQ7QUFDRDtBQUNGLGFBWlE7QUFhVFEsa0JBQU0sY0FBVVIsS0FBVixFQUFpQjtBQUNyQkQsd0JBQVFDLEtBQVIsQ0FBYyw0RUFBNEVBLEtBQTFGO0FBQ0Q7QUFmUSxTQUFYO0FBaUJEOztBQUVELGFBQVNhLHVCQUFULENBQWlDb0IsSUFBakMsRUFBdUM7QUFDbkMsWUFBSUMsWUFBWSxJQUFoQjtBQUNBLGdCQUFPRCxJQUFQO0FBQ0ksaUJBQUssS0FBTDtBQUFZQyw0QkFBWSxvQkFBWixDQUFrQztBQUM5QyxpQkFBSyxLQUFMO0FBQVlBLDRCQUFZLHVCQUFaLENBQXFDO0FBQ2pELGlCQUFLLEtBQUw7QUFBWUEsNEJBQVksdUJBQVosQ0FBcUM7QUFDakQsaUJBQUssSUFBTDtBQUFXQSw0QkFBWSx3QkFBWixDQUFzQztBQUNqRDtBQUFTbkMsd0JBQVFDLEtBQVIsQ0FBYywyREFBZDtBQUxiO0FBT0EsZUFBT2tDLFNBQVA7QUFDSDtBQUVBLENBM0pEIiwiZmlsZSI6InFpbml1VXBsb2FkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBjcmVhdGVkIGJ5IGdwYWtlXG4oZnVuY3Rpb24oKSB7XG5cbnZhciBjb25maWcgPSB7XG4gICAgcWluaXVSZWdpb246ICcnLFxuICAgIHFpbml1SW1hZ2VVUkxQcmVmaXg6ICcnLFxuICAgIHFpbml1VXBsb2FkVG9rZW46ICcnLFxuICAgIHFpbml1VXBsb2FkVG9rZW5VUkw6ICcnLFxuICAgIHFpbml1VXBsb2FkVG9rZW5GdW5jdGlvbjogbnVsbCxcbiAgICBxaW5pdVNob3VsZFVzZVFpbml1RmlsZU5hbWU6IGZhbHNlXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGluaXQ6IGluaXQsXG4gICAgdXBsb2FkOiB1cGxvYWQsXG59XG5cbi8vIOWcqOaVtOS4queoi+W6j+eUn+WRveWRqOacn+S4re+8jOWPqumcgOimgSBpbml0IOS4gOasoeWNs+WPr1xuLy8g5aaC5p6c6ZyA6KaB5Y+Y5pu05Y+C5pWw77yM5YaN6LCD55SoIGluaXQg5Y2z5Y+vXG5mdW5jdGlvbiBpbml0KG9wdGlvbnMpIHtcbiAgICBjb25maWcgPSB7XG4gICAgICAgIHFpbml1UmVnaW9uOiAnJyxcbiAgICAgICAgcWluaXVJbWFnZVVSTFByZWZpeDogJycsXG4gICAgICAgIHFpbml1VXBsb2FkVG9rZW46ICcnLFxuICAgICAgICBxaW5pdVVwbG9hZFRva2VuVVJMOiAnJyxcbiAgICAgICAgcWluaXVVcGxvYWRUb2tlbkZ1bmN0aW9uOiBudWxsLFxuICAgICAgICBxaW5pdVNob3VsZFVzZVFpbml1RmlsZU5hbWU6IGZhbHNlXG4gICAgfTtcbiAgICB1cGRhdGVDb25maWdXaXRoT3B0aW9ucyhvcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQ29uZmlnV2l0aE9wdGlvbnMob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLnJlZ2lvbikge1xuICAgICAgICBjb25maWcucWluaXVSZWdpb24gPSBvcHRpb25zLnJlZ2lvbjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdxaW5pdSB1cGxvYWRlciBuZWVkIHlvdXIgYnVja2V0IHJlZ2lvbicpO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy51cHRva2VuKSB7XG4gICAgICAgIGNvbmZpZy5xaW5pdVVwbG9hZFRva2VuID0gb3B0aW9ucy51cHRva2VuO1xuICAgIH0gZWxzZSBpZiAob3B0aW9ucy51cHRva2VuVVJMKSB7XG4gICAgICAgIGNvbmZpZy5xaW5pdVVwbG9hZFRva2VuVVJMID0gb3B0aW9ucy51cHRva2VuVVJMO1xuICAgIH0gZWxzZSBpZihvcHRpb25zLnVwdG9rZW5GdW5jKSB7XG4gICAgICAgIGNvbmZpZy5xaW5pdVVwbG9hZFRva2VuRnVuY3Rpb24gPSBvcHRpb25zLnVwdG9rZW5GdW5jO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5kb21haW4pIHtcbiAgICAgICAgY29uZmlnLnFpbml1SW1hZ2VVUkxQcmVmaXggPSBvcHRpb25zLmRvbWFpbjtcbiAgICB9XG4gICAgY29uZmlnLnFpbml1U2hvdWxkVXNlUWluaXVGaWxlTmFtZSA9IG9wdGlvbnMuc2hvdWxkVXNlUWluaXVGaWxlTmFtZVxufVxuXG5mdW5jdGlvbiB1cGxvYWQoZmlsZVBhdGgsIHN1Y2Nlc3MsIGZhaWwsIG9wdGlvbnMpIHtcbiAgICBpZiAobnVsbCA9PSBmaWxlUGF0aCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdxaW5pdSB1cGxvYWRlciBuZWVkIGZpbGVQYXRoIHRvIHVwbG9hZCcpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChvcHRpb25zKSB7XG4gICAgICB1cGRhdGVDb25maWdXaXRoT3B0aW9ucyhvcHRpb25zKTtcbiAgICB9XG4gICAgaWYgKGNvbmZpZy5xaW5pdVVwbG9hZFRva2VuKSB7XG4gICAgICAgIGRvVXBsb2FkKGZpbGVQYXRoLCBzdWNjZXNzLCBmYWlsLCBvcHRpb25zKTtcbiAgICB9IGVsc2UgaWYgKGNvbmZpZy5xaW5pdVVwbG9hZFRva2VuVVJMKSB7XG4gICAgICAgIGdldFFpbml1VG9rZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkb1VwbG9hZChmaWxlUGF0aCwgc3VjY2VzcywgZmFpbCwgb3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoY29uZmlnLnFpbml1VXBsb2FkVG9rZW5GdW5jdGlvbikge1xuICAgICAgICBjb25maWcucWluaXVVcGxvYWRUb2tlbiA9IGNvbmZpZy5xaW5pdVVwbG9hZFRva2VuRnVuY3Rpb24oKTtcbiAgICAgICAgaWYgKG51bGwgPT0gY29uZmlnLnFpbml1VXBsb2FkVG9rZW4gJiYgY29uZmlnLnFpbml1VXBsb2FkVG9rZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcigncWluaXUgVXBsb2FkVG9rZW5GdW5jdGlvbiByZXN1bHQgaXMgbnVsbCwgcGxlYXNlIGNoZWNrIHRoZSByZXR1cm4gdmFsdWUnKTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcigncWluaXUgdXBsb2FkZXIgbmVlZCBvbmUgb2YgW3VwdG9rZW4sIHVwdG9rZW5VUkwsIHVwdG9rZW5GdW5jXScpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkb1VwbG9hZChmaWxlUGF0aCwgc3VjY2VzcywgZmFpbCwgb3B0aW9ucykge1xuICAgIGlmIChudWxsID09IGNvbmZpZy5xaW5pdVVwbG9hZFRva2VuICYmIGNvbmZpZy5xaW5pdVVwbG9hZFRva2VuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc29sZS5lcnJvcigncWluaXUgVXBsb2FkVG9rZW4gaXMgbnVsbCwgcGxlYXNlIGNoZWNrIHRoZSBpbml0IGNvbmZpZyBvciBuZXR3b3JraW5nJyk7XG4gICAgICAgIHJldHVyblxuICAgIH1cbiAgICB2YXIgdXJsID0gdXBsb2FkVVJMRnJvbVJlZ2lvbkNvZGUoY29uZmlnLnFpbml1UmVnaW9uKTtcbiAgICB2YXIgZmlsZU5hbWUgPSBmaWxlUGF0aC5zcGxpdCgnLy8nKVsxXTtcbiAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmtleSkge1xuICAgICAgICBmaWxlTmFtZSA9IG9wdGlvbnMua2V5O1xuICAgIH1cbiAgICB2YXIgZm9ybURhdGEgPSB7XG4gICAgICAgICd0b2tlbic6IGNvbmZpZy5xaW5pdVVwbG9hZFRva2VuXG4gICAgfTtcbiAgICBpZiAoIWNvbmZpZy5xaW5pdVNob3VsZFVzZVFpbml1RmlsZU5hbWUpIHtcbiAgICAgIGZvcm1EYXRhWydrZXknXSA9IGZpbGVOYW1lXG4gICAgfVxuICAgIHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgZmlsZVBhdGg6IGZpbGVQYXRoLFxuICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgIGZvcm1EYXRhOiBmb3JtRGF0YSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgIHZhciBkYXRhU3RyaW5nID0gcmVzLmRhdGFcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIGRhdGFPYmplY3QgPSBKU09OLnBhcnNlKGRhdGFTdHJpbmcpO1xuICAgICAgICAgICAgLy9kbyBzb21ldGhpbmdcbiAgICAgICAgICAgIHZhciBpbWFnZVVybCA9IGNvbmZpZy5xaW5pdUltYWdlVVJMUHJlZml4ICsgJy8nICsgZGF0YU9iamVjdC5rZXk7XG4gICAgICAgICAgICBkYXRhT2JqZWN0LmltYWdlVVJMID0gaW1hZ2VVcmw7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhT2JqZWN0KTtcbiAgICAgICAgICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICAgICAgICAgIHN1Y2Nlc3MoZGF0YU9iamVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygncGFyc2UgSlNPTiBmYWlsZWQsIG9yaWdpbiBTdHJpbmcgaXM6ICcgKyBkYXRhU3RyaW5nKVxuICAgICAgICAgICAgaWYgKGZhaWwpIHtcbiAgICAgICAgICAgICAgZmFpbChlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICBpZiAoZmFpbCkge1xuICAgICAgICAgICAgICAgIGZhaWwoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gZ2V0UWluaXVUb2tlbihjYWxsYmFjaykge1xuICB3eC5yZXF1ZXN0KHtcbiAgICB1cmw6IGNvbmZpZy5xaW5pdVVwbG9hZFRva2VuVVJMLFxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgIHZhciB0b2tlbiA9IHJlcy5kYXRhLnVwdG9rZW47XG4gICAgICBpZiAodG9rZW4gJiYgdG9rZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25maWcucWluaXVVcGxvYWRUb2tlbiA9IHRva2VuO1xuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ3Fpbml1VXBsb2FkZXIgY2Fubm90IGdldCB5b3VyIHRva2VuLCBwbGVhc2UgY2hlY2sgdGhlIHVwdG9rZW5VUkwgb3Igc2VydmVyJylcbiAgICAgIH1cbiAgICB9LFxuICAgIGZhaWw6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcigncWluaXUgVXBsb2FkVG9rZW4gaXMgbnVsbCwgcGxlYXNlIGNoZWNrIHRoZSBpbml0IGNvbmZpZyBvciBuZXR3b3JraW5nOiAnICsgZXJyb3IpO1xuICAgIH1cbiAgfSlcbn1cblxuZnVuY3Rpb24gdXBsb2FkVVJMRnJvbVJlZ2lvbkNvZGUoY29kZSkge1xuICAgIHZhciB1cGxvYWRVUkwgPSBudWxsO1xuICAgIHN3aXRjaChjb2RlKSB7XG4gICAgICAgIGNhc2UgJ0VDTic6IHVwbG9hZFVSTCA9ICdodHRwczovL3VwLnFib3gubWUnOyBicmVhaztcbiAgICAgICAgY2FzZSAnTkNOJzogdXBsb2FkVVJMID0gJ2h0dHBzOi8vdXAtejEucWJveC5tZSc7IGJyZWFrO1xuICAgICAgICBjYXNlICdTQ04nOiB1cGxvYWRVUkwgPSAnaHR0cHM6Ly91cC16Mi5xYm94Lm1lJzsgYnJlYWs7XG4gICAgICAgIGNhc2UgJ05BJzogdXBsb2FkVVJMID0gJ2h0dHBzOi8vdXAtbmEwLnFib3gubWUnOyBicmVhaztcbiAgICAgICAgZGVmYXVsdDogY29uc29sZS5lcnJvcigncGxlYXNlIG1ha2UgdGhlIHJlZ2lvbiBpcyB3aXRoIG9uZSBvZiBbRUNOLCBTQ04sIE5DTiwgTkFdJyk7XG4gICAgfVxuICAgIHJldHVybiB1cGxvYWRVUkw7XG59XG5cbn0pKCk7XG4iXX0=