"use strict";
var UploadLogo = window.UploadLogo || {};
UploadLogo = function () {
    var d = function () {
        var g = "";
        $.ajax({
            url: appweburl + "/_api/contextinfo",
            method: "POST",
            async: false,
            headers: {
                Accept: "application/json; odata=verbose"
            },
            cache: false,
            success: function (h) {
                g = h.d.GetContextWebInformation.FormDigestValue
            },
            error: function (h, i, j) {
                alert(j)
            }
        });
        return g
    }
        , b = function () {
            var g = d();
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('ImagesUploads')/items",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "POST",
                data: JSON.stringify({
                    __metadata: {
                        type: "SP.Data.ImagesUploadsListItem"
                    },
                    Title: "Logo"
                }),
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": g
                },
                error: function (j, h, i) {
                    alert(i)
                }
            })
        }
        , c = function () {
            var g;
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('ImagesUploads')/items?$select=Id,Attachments,AttachmentFiles&$expand=AttachmentFiles",
                type: "GET",
                async: false,
                cache: false,
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                success: function (h) {
                    if (h.d.results.length > 0) {
                        g = h.d.results[0].AttachmentFiles.results
                    }
                },
                error: function (j, h, i) {
                    alert(i)
                }
            });
            return g
        }
        , a = function (l) {
            var j = ";base64,";
            var k = l.indexOf(j) + j.length;
            var h = l.substring(k);
            var n = window.atob(h);
            var o = n.length;
            var g = new Uint8Array(new ArrayBuffer(o));
            for (var m = 0; m < o; m++) {
                g[m] = n.charCodeAt(m)
            }
            return g
        }
        , f = function (j, h, g) {
            var i = d();
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('ImagesUploads')/items('1')/AttachmentFiles/add(FileName='" + h + "')",
                type: "POST",
                async: false,
                processData: false,
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": i
                },
                data: a(g),
                error: function (m, k, l) {
                    alert(l)
                },
                success: function (k) {
                    e(j, h)
                }
            })
        }
        , e = function (h, i) {
            var g = d();
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('Settings')/getItemByStringId('" + h + "')",
                type: "POST",
                async: true,
                contentType: "application/json;odata=verbose",
                data: JSON.stringify({
                    __metadata: {
                        type: "SP.Data.SettingsListItem"
                    },
                    AppLogoFile: i
                }),
                headers: {
                    accept: "application/json;odata=verbose",
                    "X-RequestDigest": g,
                    "X-Http-Method": "PATCH",
                    "IF-MATCH": "*"
                },
                success: function (j) {
                    setTimeout(function () {
                        location.href = "Settings.aspx"
                    }, 500)
                }
            })
        };
    return {
        createItem: b,
        getAttachments: c,
        uploadFile: f,
        updateSettingItem: e
    }
}();
function getCustomSettingValue(a, b) {
    var c = {
        ID: "",
        Value: ""
    };
    $.each(a, function () {
        if (this.EnumValue == b) {
            c.Value = this.SettingValue;
            c.ID = this.ID;
            return
        }
    });
    return c
}
function generateUUID() {
    var a = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        a += performance.now()
    }
    var b = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (d) {
        var e = (a + Math.random() * 16) % 16 | 0;
        a = Math.floor(a / 16);
        return (d == "x" ? e : (e & 3 | 8)).toString(16)
    });
    return b
}
$(document).ready(function () {
    if (CurrentUser.IsAdmin == false) {
        location.href = "AccessDenied.aspx";
        return
    }
    var a = UploadLogo.getAttachments();
    if (a == null) {
        UploadLogo.createItem()
    }
    if (SystemSettings.AppLogo == "standard") {
        addMessage("To apply this feature you need to setup App Logo to 'Custom' and click Save ", "warning")
    }
    function b(c) {
        if (c.files && c.files[0]) {
            var d = new FileReader();
            d.onload = function (f) {
                var g = "url('" + f.target.result + "')";
                $("#logoleft").css("background-image", g)
            }
                ;
            d.readAsDataURL(c.files[0])
        }
    }
    $("#fileUpload").change(function () {
        if ($("#chbPreview").prop("checked")) {
            b(this)
        }
    });
    $("#uploadLogoForm").submit(function (c) {
        c.preventDefault();
        var e = $("#fileUpload").prop("files");
        var d = e[0];
        if (d) {
            var f = new FileReader();
            f.onload = function (g) {
                var i = d.name;
                var h = i.substr(i.lastIndexOf(".") + 1);
                var j = generateUUID() + "." + h;
                UploadLogo.uploadFile(SystemSettings.SettingId, j, g.target.result)
            }
                ;
            f.readAsDataURL(d)
        }
    })
});
