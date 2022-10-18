"use strict";
var UserProfileEdit = window.UserProfileEdit || {};
UserProfileEdit = function () {
    var d = function () {
        var h = "";
        $.ajax({
            url: appweburl + "/_api/contextinfo",
            method: "POST",
            async: false,
            headers: {
                Accept: "application/json; odata=verbose"
            },
            cache: false,
            success: function (i) {
                h = i.d.GetContextWebInformation.FormDigestValue
            },
            error: function (i, j, k) {
                alert(k)
            }
        });
        return h
    }
        , c = function () {
            var h;
            $.ajax({
                url: appweburl + "/_api/web/siteusers?$filter=substringof('SPOCrawler',Email) eq false and PrincipalType eq 1 and substringof('SPOCrawler',LoginName) eq false and substringof('_SPOC',Title) eq false and substringof('spocrwl',LoginName) eq false and substringof('_spocrawler',LoginName) eq false",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                cache: false,
                success: function (i) {
                    h = i.d.results
                },
                error: function (k, i, j) {
                    alert(j)
                }
            });
            return h
        }
        , b = function () {
            var h;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/UserRoles/?$inlinecount=allpages&$select=Id,RoleName,Employee,EmployeeName&$expand=Employee&$filter=RoleName eq 'Manager'",
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                async: false,
                cache: false,
                success: function (i) {
                    h = i.d.results
                }
            });
            return h
        }
        , e = function (h) {
            var i;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/UserProfiles?$select=Id,User,Manager,FirstApproverId,FirstApproverName,SecondApproverId,SecondApproverName,HourlyRate&$expand=User,Manager&$filter=Id eq " + h,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                async: false,
                success: function (j) {
                    i = j.d.results[0]
                },
                error: function (j, k, l) {
                    alert(l)
                }
            });
            return i
        }
        , f = function (h) {
            var i;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/UserProfiles?$select=Id,User&$filter=UserId eq " + h,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                async: false,
                success: function (j) {
                    i = j.d.results[0]
                },
                error: function (j, k, l) {
                    alert(l)
                }
            });
            return i
        }
        , a = function (h) {
            var i = d();
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('UserProfiles')/items",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "POST",
                data: JSON.stringify(h),
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": i
                },
                success: function (j) {
                    location.href = "UserProfilesList.html"
                },
                error: function (l, j, k) {
                    alert(k)
                }
            })
        }
        , g = function (j, h) {
            var i = d();
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('UserProfiles')/getItemByStringId('" + j + "')",
                type: "POST",
                async: true,
                contentType: "application/json;odata=verbose",
                data: JSON.stringify(h),
                headers: {
                    accept: "application/json;odata=verbose",
                    "X-RequestDigest": i,
                    "X-Http-Method": "PATCH",
                    "IF-MATCH": "*"
                },
                success: function (k) {
                    location.href = "UserProfilesList.html"
                },
                error: function (m, k, l) {
                    alert(l)
                }
            })
        };
    return {
        getAllUsers: c,
        getAllManagers: b,
        getUserProfile: e,
        getUserProfileByUserId: f,
        createItem: a,
        updateItem: g
    }
}();
$(document).ready(function () {
    if (CurrentUser.IsAdmin == false) {
        location.href = "AccessDenied.aspx";
        return
    }
    var g;
    var h = getQueryStringParameter("ID");
    if (typeof h == "undefined") {
        g = "Create"
    } else {
        if ($.isNumeric(h) == true) {
            g = "Edit";
            $("#title").text("Edit user profile");
            $("#h1").text("Edit user profile");
            var i = UserProfileEdit.getUserProfile(h);
            if (i == null) {
                location.href = "NotFound.aspx";
                return
            }
        } else {
            location.href = "NotFound.aspx";
            return
        }
    }
    jQuery("#UserProfileEdit").validate({
        ignore: ".ignore",
        rules: {
            ddlUser: "required",
            ddlDepartment: "required",
            ddlManager: "required",
            ddlFirstApprover: "required"
        },
        highlight: function (j) {
            jQuery(j).closest(".control-group").addClass("error")
        },
        success: function (j) {
            jQuery(j).closest(".control-group").removeClass("error")
        }
    });
    if (SystemSettings.HourlyRate == "user") {
        $("#pHourlyRate").show();
        $("#lblHourlyRate").text("Hourly Rate (" + SystemSettings.CurrencySymbol + ")");
        $("#txtHourlyRate").rules("add", {
            number: true
        })
    }
    var b = UserProfileEdit.getAllUsers();
    var f = $("#ddlUser");
    var c = $("#ddlFirstApprover");
    var e = $("#ddlSecondApprover");
    $.each(b, function () {
        f.append($("<option>", {
            value: this.Id,
            text: this.Title + (isEmpty(this.Email) ? "" : " (" + this.Email + ")"),
            fullName: this.Title
        }));
        c.append($("<option>", {
            value: this.Id,
            text: this.Title + (isEmpty(this.Email) ? "" : " (" + this.Email + ")"),
            fullName: this.Title
        }));
        e.append($("<option>", {
            value: this.Id,
            text: this.Title + (isEmpty(this.Email) ? "" : " (" + this.Email + ")"),
            fullName: this.Title
        }))
    });
    var d = $("#ddlManager");
    var a = UserProfileEdit.getAllManagers();
    if (a.length == 0) {
        addMessage("No Manager roles defined (go to Administration->User Roles).", "warning")
    }
    if (a != null) {
        $.each(a, function () {
            if (this.Employee != null) {
                var j = this.EmployeeName;
                if (isEmpty(this.Employee.Name) == false) {
                    j = this.Employee.Name
                } else {
                    if (isEmpty(this.Employee.FirstName) == false && isEmpty(this.Employee.LastName) == false) {
                        j = this.Employee.FirstName + " " + this.Employee.LastName
                    }
                }
                d.append($("<option>", {
                    value: this.Employee.Id,
                    text: j + (isEmpty(this.Employee.WorkEmail) ? "" : " (" + this.Employee.WorkEmail + ")"),
                    fullname: j
                }))
            }
        })
    }
    if (g == "Edit") {
        if (i.User != null) {
            $("#ddlUser").val(i.User.Id)
        }
        if (i.Manager != null) {
            $("#ddlManager").val(i.Manager.Id)
        }
        if (isEmpty(i.FirstApproverId) == false) {
            $("#ddlFirstApprover").val(i.FirstApproverId)
        }
        $("#ddlUser").prop("disabled", true);
        if (isEmpty(i.SecondApproverId) == false) {
            $("#ddlSecondApprover").val(i.SecondApproverId)
        }
        if (isEmpty(i.HourlyRate) == false) {
            $("#txtHourlyRate").val(i.HourlyRate)
        }
    }
    $(".select2").select2({
        placeholder: "Select..."
    });
    $("#btnCancel").click(function () {
        location.href = "UserProfilesList.html"
    });
    $("#UserProfileEdit").submit(function (k) {
        if ($("#UserProfileEdit").valid()) {
            k.preventDefault();
            var j = {
                __metadata: {
                    type: "SP.Data.UserProfilesListItem"
                },
                qUserId: $("#ddlUser").val(),
                ManagerId: $("#ddlManager").val(),
                FirstApproverId: isEmpty($("#ddlFirstApprover").val()) == false ? $("#ddlFirstApprover").val() : "",
                FirstApproverName: isEmpty($("#ddlFirstApprover").val()) == false ? $("#ddlFirstApprover option:selected").attr("fullName") : "",
                SecondApproverId: isEmpty($("#ddlSecondApprover").val()) == false && $("#ddlSecondApprover").val() != "empty" ? $("#ddlSecondApprover").val() : "",
                SecondApproverName: isEmpty($("#ddlSecondApprover").val()) == false && $("#ddlSecondApprover").val() != "empty" ? $("#ddlSecondApprover option:selected").attr("fullName") : "",
                UserName1: $("#ddlUser option:selected").attr("fullName"),
                ManagerName: $("#ddlManager option:selected").attr("fullName"),
                HideFromDelve: true
            };
            if (SystemSettings.HourlyRate == "user") {
                j.HourlyRate = $("#txtHourlyRate").val()
            }
            if (g == "Create") {
                var l = UserProfileEdit.getUserProfileByUserId($("#ddlUser").val());
                if (l != null) {
                    addMessage("User profile already exists.", "warning");
                    return
                }
                UserProfileEdit.createItem(j)
            } else {
                if (g == "Edit") {
                    UserProfileEdit.updateItem(h, j)
                }
            }
        }
    })
});
