"use strict";
var Licenses = window.Licenses || {};
Licenses = function () {
    var a = function () {
        var d = "";
        $.ajax({
            url: appweburl + "/_api/contextinfo",
            method: "POST",
            async: false,
            headers: {
                Accept: "application/json; odata=verbose"
            },
            cache: false,
            success: function (e) {
                d = e.d.GetContextWebInformation.FormDigestValue
            },
            error: function (e, f, g) {
                alert(g)
            }
        });
        return d
    }
        , b = function () {
            var d;
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('Licenses')/items?$select=ID,TrialStartDate,ActivationKey,IsInitialized,IsValid",
                type: "GET",
                async: false,
                cache: false,
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                success: function (e) {
                    d = e.d.results[0]
                },
                error: function (g, e, f) {
                    alert(f)
                }
            });
            return d
        }
        , c = function (f, d) {
            var e = a();
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('Licenses')/getItemByStringId(" + f + ")",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "POST",
                data: JSON.stringify({
                    __metadata: {
                        type: "SP.Data.LicensesListItem"
                    },
                    ActivationKey: d,
                    IsValid: true
                }),
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": e,
                    "X-Http-Method": "PATCH",
                    "IF-MATCH": "*"
                },
                success: function (g) {
                    location.href = "Licenses.html"
                },
                error: function (i, g, h) {
                    alert(h)
                }
            })
        };
    return {
        getLicense: b,
        updateLicense: c
    }
}();
$(document).ready(function () {
    var a = Licenses.getLicense();
    if (a != null && a.IsValid == true) {
        $("#validForm").show();
        $("#lblMessage").text("Timesheet Plus license is valid.");
        $("#lblActivationKey").text(a.ActivationKey)
    } else {
        $("#licenseForm").show()
    }
    $("#licenseForm").submit(function (c) {
        if ($("#licenseForm").valid()) {
            c.preventDefault();
            var b = $("#txtActivationKey").val().StripTags().trim();
            if (CryptoJS.SHA3(b, {
                outputLength: 256
            }) == "97c8e2c5c7c33d7dc8c2c7c2e035ebecc592abede2e33c49729dbc0f943ff1af") {
                Licenses.updateLicense(a.ID, b)
            } else {
                addMessage("The Activation Key is not correct", "error");
                return
            }
        }
    });
    jQuery("#licenseForm").validate({
        ignore: ".ignore",
        rules: {
            txtActivationKey: {
                required: true,
                maxlength: 250
            }
        },
        messages: {
            txtActivationKey: "Please enter your Activation Key"
        },
        highlight: function (b) {
            jQuery(b).closest(".control-group").addClass("error")
        },
        success: function (b) {
            jQuery(b).closest(".control-group").removeClass("error")
        }
    })
});
