"use strict";
var RecordsUpdater = window.RecordsUpdater || {};
RecordsUpdater = function () {
    var a = function () {
        var e = "";
        $.ajax({
            url: appweburl + "/_api/contextinfo",
            method: "POST",
            async: false,
            headers: {
                Accept: "application/json; odata=verbose"
            },
            cache: false,
            success: function (f) {
                e = f.d.GetContextWebInformation.FormDigestValue
            },
            error: function (f, g, h) {
                alert(h)
            }
        });
        return e
    }
        , c = function () {
            var e;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/Settings?$select=Id",
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                async: false,
                success: function (f) {
                    e = f.d.results[0]
                },
                error: function (f, g, h) {
                    alert(h)
                }
            });
            return e
        }
        , b = function () {
            var e = 0;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/Requests?$filter=" + rowLimiterFilter + " Id gt 0&$select=Id&$top=1&$orderby=Id desc",
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                async: false,
                cache: false,
                success: function (f) {
                    if (f.d[0] != null) {
                        e = f.d[0].Id
                    }
                }
            });
            return e
        }
        , d = function (f, g) {
            var e = a();
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('Settings')/getItemByStringId('" + f + "')",
                type: "POST",
                async: true,
                contentType: "application/json;odata=verbose",
                data: JSON.stringify({
                    __metadata: {
                        type: "SP.Data.SettingsListItem"
                    },
                    ReqCount: g
                }),
                headers: {
                    accept: "application/json;odata=verbose",
                    "X-RequestDigest": e,
                    "X-Http-Method": "PATCH",
                    "IF-MATCH": "*"
                }
            })
        };
    return {
        getSettings: c,
        getRequestCount: b,
        updateReqCountSetting: d
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
$(document).ready(function () {
    var b = RecordsUpdater.getSettings();
    if (b == null) {
        return
    }
    var c = b.Id;
    var a = RecordsUpdater.getRequestCount();
    RecordsUpdater.updateReqCountSetting(c, String(a))
});
