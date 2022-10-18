"use strict";
var ImportUserProfiles = window.ImportUserProfiles || {};
ImportUserProfiles = function () {
    var c = function () {
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
        , b = function () {
            var e;
            $.ajax({
                url: appweburl + "/_api/web/siteusers",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                cache: false,
                success: function (f) {
                    e = f.d.results
                },
                error: function (h, f, g) {
                    alert(g)
                }
            });
            return e
        }
        , d = function () {
            var e;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/UserProfiles?$select=Id,User,FirstApproverId,FirstApproverName,SecondApproverId,SecondApproverName&$expand=User",
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                async: false,
                success: function (f) {
                    e = f.d.results
                },
                error: function (f, g, h) {
                    alert(h)
                }
            });
            return e
        }
        , a = function (f, e) {
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('UserProfiles')/items",
                contentType: "application/json; odata=verbose",
                type: "POST",
                data: JSON.stringify(f),
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": e
                }
            })
        };
    return {
        getFormDigestValue: c,
        getAllUsers: b,
        createRequest: a,
        getUserProfiles: d
    }
}();
var spinnerLoaded = false;
$(document).ready(function () {
    if (CurrentUser.IsAdmin == false) {
        location.href = "AccessDenied.aspx";
        return
    }
    var a = ImportUserProfiles.getAllUsers();
    var b = {};
    $.each(a, function () {
        if (isEmpty(this.Email) == false) {
            var j = {
                Id: this.Id,
                Email: this.Email.toLowerCase(),
                Title: this.Title
            };
            b[this.Email.toLowerCase()] = j
        }
    });
    $("#btnImport").click(function () {
        $("#processingForm").loading({
            theme: "light",
            start: true
        });
        $(".handsontable th").css("background-color", "#B2D4EE");
        $(".handsontable th").css("border-right", "#B2D4EE");
        $(".handsontable th").css("border-left", "#B2D4EE");
        $(".handsontable th").css("border-top", "#B2D4EE");
        var n = ImportUserProfiles.getUserProfiles();
        var o = {};
        $.each(n, function () {
            if (isEmpty(this.UserEmail) == false) {
                o[this.UserEmail.toLowerCase()] = this.UserEmail.toLowerCase()
            }
        });
        var m = $("#divImportSheet").data("handsontable").getData();
        var k = ImportUserProfiles.getFormDigestValue();
        var l = 0;
        var j = 0;
        $.each(m, function () {
            var s = (isEmpty(this.ManagerEmail) == false && (isEmpty(this.UserEmail) == false && isEmpty(this.FirstApproverEmail) == false));
            if (s) {
                this.UserEmail = this.UserEmail.toLowerCase();
                this.ManagerEmail = this.ManagerEmail.toLowerCase();
                this.FirstApproverEmail = this.FirstApproverEmail.toLowerCase();
                if (isEmpty(this.SecondApproverEmail) == false) {
                    this.SecondApproverEmail = this.SecondApproverEmail.toLowerCase()
                }
                var u = this.UserEmail in b;
                var r = this.ManagerEmail in b;
                var p = this.FirstApproverEmail in b;
                var t = (isEmpty(this.SecondApproverEmail) || this.FirstApproverEmail in b);
                if (u && r && p && t) {
                    var v = this.UserEmail in o;
                    if (v == false) {
                        var q = {
                            __metadata: {
                                type: "SP.Data.UserProfilesListItem"
                            },
                            UserId: b[this.UserEmail].Id,
                            ManagerId: b[this.ManagerEmail].Id,
                            ManagerName: b[this.ManagerEmail].Title,
                            FirstApproverId: String(b[this.FirstApproverEmail].Id),
                            FirstApproverName: b[this.FirstApproverEmail].Title,
                            UserName: b[this.UserEmail].Title,
                            HideFromDelve: true
                        };
                        if (isEmpty(this.SecondApproverEmail) == false) {
                            q.SecondApproverId = String(b[this.SecondApproverEmail].Id);
                            q.SecondApproverName = b[this.SecondApproverEmail].Title
                        }
                        ImportUserProfiles.createRequest(q, k);
                        l++
                    } else {
                        j++
                    }
                    if (l >= 50) {
                        return false
                    }
                }
            }
        });
        if (l > 0) {
            setTimeout(function () {
                addMessage(l + " records has been successfully sent to import.", "success");
                $("#processingForm").loading("stop");
                $(".handsontable th").css("background-color", "#0072C6");
                $(".handsontable th").css("border-right", "#0072C6");
                $(".handsontable th").css("border-left", "#0072C6");
                $(".handsontable th").css("border-top", "#0072C6");
                h = [];
                $("#divImportSheet").data("handsontable").updateSettings({
                    data: h
                })
            }, 3000)
        } else {
            addMessage("No records to import.", "warning");
            $("#processingForm").loading("stop");
            $(".handsontable th").css("background-color", "#0072C6");
            $(".handsontable th").css("border-right", "#0072C6");
            $(".handsontable th").css("border-left", "#0072C6");
            $(".handsontable th").css("border-top", "#0072C6")
        }
        if (j > 0) {
            addMessage(j + " record(s) already exists.", "warning")
        }
    });
    var i = function (k, j) {
        setTimeout(function () {
            var l = k;
            if (isEmpty(l) == false) {
                l = l.toLowerCase()
            }
            if (l in b) {
                j(true)
            } else {
                j(false)
            }
        }, 200)
    };
    var g = [];
    var f = new Object();
    f.data = "UserEmail";
    f.title = "User Email";
    f.width = 200;
    f.validator = i;
    g.push(f);
    var d = new Object();
    d.data = "ManagerEmail";
    d.title = "Manager Email";
    d.width = 200;
    d.validator = i;
    g.push(d);
    var c = new Object();
    c.data = "FirstApproverEmail";
    c.title = "First Approver Email";
    c.width = 200;
    c.validator = i;
    g.push(c);
    var e = new Object();
    e.data = "SecondApproverEmail";
    e.title = "Second Approver Email (Optional)";
    e.width = 230;
    g.push(e);
    var h = [];
    $("#divImportSheet").handsontable({
        data: h,
        minSpareRows: 1,
        startRows: 1,
        maxRowsNumber: 50,
        className: "htCenter",
        multiSelect: false,
        contextMenu: ["row_above", "row_below", "remove_row"],
        columns: g
    })
});
