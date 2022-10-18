"use strict";
var UserRoleCreate = window.UserRoleCreate || {};
UserRoleCreate = function () {
    var c = function () {
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
                url: appweburl + "/_api/web/siteusers?$filter=substringof('SPOCrawler',Email) eq false and PrincipalType eq 1 and substringof('SPOCrawler',LoginName) eq false and substringof('_SPOC',Title) eq false and substringof('spocrwl',LoginName) eq false and substringof('_spocrawler',LoginName) eq false",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                cache: false,
                success: function (e) {
                    d = e.d.results
                },
                error: function (g, e, f) {
                    alert(f)
                }
            });
            return d
        }
        , a = function (g, h, f) {
            var d = c();
            var e = false;
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('UserRoles')/items?$select=ID,RoleName,Employee/Id&$expand=Employee/Id&$filter=Employee/Id eq " + g + " and RoleName eq '" + f + "'",
                type: "GET",
                async: false,
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                success: function (i) {
                    if (i.d.results.length > 0) {
                        e = true
                    }
                },
                error: function (k, i, j) {
                    alert(j)
                }
            });
            if (e) {
                addMessage("Cannot create role because this role already exists!", "warning");
                return
            }
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('UserRoles')/items",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "POST",
                data: JSON.stringify({
                    __metadata: {
                        type: "SP.Data.UserRolesListItem"
                    },
                    RoleName: f,
                    EmployeeId: g,
                    EmployeeName: h,
                    //HideFromDelve: true
                }),
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": d
                },
                success: function (i) {
                    location.href = "UserRolesList.html"
                },
                error: function (k, i, j) {
                    alert(j)
                }
            })
        };
    return {
        createItem: a,
        getAllUsers: b
    }
}();
$(document).ready(function () {
    if (CurrentUser.IsAdmin == false) {
        location.href = "AccessDenied.aspx";
        return
    }
    $("#btnCancel").click(function () {
        location.href = "UserRolesList.html"
    });
    $(".select2").select2({
        placeholder: "Select..."
    });
    var a = UserRoleCreate.getAllUsers();
    var b = $("#ddlUser");
    $.each(a, function () {
        b.append($("<option>", {
            value: this.Id,
            text: this.Title + (isEmpty(this.Email) ? "" : " (" + this.Email + ")"),
            fullName: this.Title,
            email: this.Email
        }))
    });
    $("#userRoleCreate").submit(function (c) {
        if ($("#userRoleCreate").valid()) {
            c.preventDefault();
            UserRoleCreate.createItem($("#ddlUser").val(), $("#ddlUser option:selected").attr("fullName"), $("#ddlRoleName").val())
        }
    });
    $("#tipRole").opentip("<b>Administrator privileges: </b> <br/>-Access to the <i>Administration</i> section <br/>-Access to all timesheets <br/>-Edit approved timesheets<br/><b>Manager privileges: </b> <br/> -Access to <i>Team Management</i> section  <br/>-Approve or reject timesheets <br/>-Edit approved timesheets<br/><b>Notice: </b> <br/> -  User role is default  for every user (no need to assign)  ", {
        delay: 0
    });
    jQuery("#userRoleCreate").validate({
        ignore: ".ignore",
        rules: {
            ddlUser: "required",
            ddlRoleName: "required"
        },
        messages: {
            ddlUser: "Please select a User",
            ddlRoleName: "Please select a Role Name"
        },
        highlight: function (c) {
            jQuery(c).closest(".control-group").addClass("error")
        },
        success: function (c) {
            jQuery(c).closest(".control-group").removeClass("error")
        }
    })
});
