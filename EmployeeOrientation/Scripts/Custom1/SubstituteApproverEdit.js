"use strict";
var SubstituteApproverEdit = window.SubstituteApproverEdit || {};
SubstituteApproverEdit = function () {
    var e = function () {
        var i = "";
        $.ajax({
            url: appweburl + "/_api/contextinfo",
            method: "POST",
            async: false,
            headers: {
                Accept: "application/json; odata=verbose"
            },
            cache: false,
            success: function (j) {
                i = j.d.GetContextWebInformation.FormDigestValue
            },
            error: function (j, k, l) {
                alert(l)
            }
        });
        return i
    }
        , c = function () {
            var i;
            $.ajax({
                url: appweburl + "/_api/web/siteusers?$filter=Email ne '' and substringof('SPOCrawler',Email) eq false and PrincipalType eq 1 and substringof('SPOCrawler',LoginName) eq false and substringof('SharePoint',Title) eq false and substringof('_SPO',Title) eq false and substringof('spocrwl',LoginName) eq false",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                cache: false,
                success: function (j) {
                    i = j.d.results
                },
                error: function (l, j, k) {
                    alert(k)
                }
            });
            return i
        }
        , b = function () {
            var i;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/UserRoles/?$inlinecount=allpages&$select=Id,RoleName,Employee&$expand=Employee&$filter=RoleName eq 'Manager'",
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                async: false,
                cache: false,
                success: function (j) {
                    i = j.d.results
                }
            });
            return i
        }
        , d = function () {
            var i;
            var j = appweburl + "/_vti_bin/ListData.svc/Departments?$select=Id,Value&$orderby=Value asc";
            $.ajax({
                url: j,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                async: false,
                success: function (k) {
                    i = k.d.results
                },
                error: function (k, l, m) {
                    alert(m)
                }
            });
            return i
        }
        , f = function (i) {
            var j;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/SubstituteApprovers?$select=Id,Manager,SubstituteApprover,StartDate,EndDate1,IsActive&$expand=Manager,SubstituteApprover&$filter=Id eq " + i,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                async: false,
                success: function (k) {
                    j = k.d.results[0]
                },
                error: function (k, l, m) {
                    alert(m)
                }
            });
            return j
        }
        , g = function (i) {
            var j;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/SubstituteApprovers?$select=Id,SubstituteApprover&$expand=SubstituteApprover,&$filter=ManagerId eq " + i,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                async: false,
                success: function (k) {
                    j = k.d.results[0]
                },
                error: function (k, l, m) {
                    alert(m)
                }
            });
            return j
        }
        , a = function (k, j) {
            var i = e();
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('SubstituteApprovers')/items",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "POST",
                data: JSON.stringify({
                    __metadata: {
                        type: "SP.Data.SubstituteApproversListItem"
                    },
                    UserId: k.UserId,
                    ManagerId: k.ManagerId,
                    SubstituteApproverId: k.SubstituteApproverId,
                    StartDate: k.StartDate,
                    EndDate1: k.EndDate1,
                    IsActive: k.IsActive,
                    HideFromDelve: true
                }),
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": i
                },
                success: function (l) {
                    location.href = "SubstituteApproversList.html" + (j ? "?My=true" : "")
                },
                error: function (n, l, m) {
                    alert(m)
                }
            })
        }
        , h = function (k, j) {
            var i = e();
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('SubstituteApprovers')/getItemByStringId('" + k.Id + "')",
                type: "POST",
                async: true,
                contentType: "application/json;odata=verbose",
                data: JSON.stringify({
                    __metadata: {
                        type: "SP.Data.SubstituteApproversListItem"
                    },
                    UserId: k.UserId,
                    ManagerId: k.ManagerId,
                    SubstituteApproverId: k.SubstituteApproverId,
                    StartDate: k.StartDate,
                    EndDate1: k.EndDate1,
                    IsActive: k.IsActive
                }),
                headers: {
                    accept: "application/json;odata=verbose",
                    "X-RequestDigest": i,
                    "X-Http-Method": "PATCH",
                    "IF-MATCH": "*"
                },
                success: function (l) {
                    location.href = "SubstituteApproversList.aspx" + (j ? "?My=true" : "")
                },
                error: function (n, l, m) {
                    alert(m)
                }
            })
        };
    return {
        getAllUsers: c,
        getAllManagers: b,
        getDepartments: d,
        getSubstituteApprover: f,
        getSubstituteApproverByManagerId: g,
        createItem: a,
        updateItem: h
    }
}();
$(document).ready(function () {
    jQuery("#SubstituteApproverEdit").validate({
        ignore: ".ignore",
        rules: {
            txtStartDate: {
                required: true,
                date: true,
            },
            txtEndDate: {
                required: true,
                date: true,
                invalidDateRange: true
            },
            ddlManager: "required",
            ddlSubstituteApprover: "required"
        },
        highlight: function (j) {
            jQuery(j).closest(".control-group").addClass("error")
        },
        success: function (j) {
            jQuery(j).closest(".control-group").removeClass("error")
        }
    });
    var e;
    var g = getQueryStringParameter("ID");
    if (typeof g == "undefined") {
        e = "Create"
    } else {
        if ($.isNumeric(g) == true) {
            e = "Edit";
            $("#title").text("Edit substitute approver");
            $("#h1").text("Edit substitute approver");
            var h = SubstituteApproverEdit.getSubstituteApprover(g);
            if (h == null) {
                location.href = "NotFound.aspx";
                return
            }
        } else {
            location.href = "NotFound.aspx";
            return
        }
    }
    var i;
    var f = getQueryStringParameter("My");
    if (typeof f == "undefined") {
        i = "All";
        if (CurrentUser.IsAdmin == false) {
            location.href = "AccessDenied.aspx";
            return
        }
    } else {
        i = "My";
        if (CurrentUser.IsAdmin == false && CurrentUser.IsManager == false) {
            location.href = "AccessDenied.aspx";
            return
        }
    }
    $("#txtStartDate").datepicker();
    $("#txtEndDate").datepicker();
    $.datepicker.setDefaults({
        dateFormat: commonDateFormat,
        showButtonPanel: false,
        changeMonth: false,
        changeYear: false,
    });
    var c = $("#ddlManager");
    var a = SubstituteApproverEdit.getAllManagers();
    if (a.length == 0) {
        addMessage("No Manager roles defined (go to Administration->User Roles).", "warning")
    }
    if (a != null) {
        $.each(a, function () {
            var j = this.EmployeeName;
            if (this.Employee != null && isEmpty(this.Employee.Name) == false) {
                j = this.Employee.Name
            } else {
                if (this.Employee != null && isEmpty(this.Employee.FirstName) == false && isEmpty(this.Employee.LastName) == false) {
                    j = this.Employee.FirstName + " " + this.Employee.LastName
                }
            }
            c.append($("<option>", {
                value: this.Employee.Id,
                text: j + (isEmpty(this.Employee.WorkEmail) ? "" : " (" + this.Employee.WorkEmail + ")"),
                fullname: j
            }))
        })
    }
    var b = SubstituteApproverEdit.getAllUsers();
    var d = $("#ddlSubstituteApprover");
    $.each(b, function () {
        d.append($("<option>", {
            value: this.Id,
            text: this.Title + " (" + this.Email + ")",
            fullName: this.Title
        }))
    });
    if (e == "Edit") {
        $("#ddlSubstituteApprover").val(h.SubstituteApprover.Id);
        $("#ddlManager").val(h.Manager.Id);
        $("#lblManager").text(h.Manager.Name);
        $("#sManagerView").show();
        $("#txtStartDate").val(moment(h.StartDate).utc().format(commonDateFormat2));
        $("#txtEndDate").val(moment(h.EndDate1).utc().format(commonDateFormat2));
        $("#chbIsActive").prop("checked", h.IsActive)
    } else {
        if (i == "My") {
            $("#sManagerView").show();
            $("#lblManager").text(CurrentUser.Name);
            $("#ddlManager").val(CurrentUser.Id);
            $("#ddlManager").rules("remove")
        } else {
            $("#sManagerEdit").show()
        }
        $("#chbIsActive").prop("checked", true)
    }
    $(".select2").select2({
        placeholder: "Select..."
    });
    $("#btnCancel").click(function () {
        location.href = "SubstituteApproversList.aspx" + (i == "My" ? "?My=true" : "")
    });
    $("#SubstituteApproverEdit").submit(function (j) {
        if ($("#SubstituteApproverEdit").valid()) {
            j.preventDefault();
            var l = {};
            l.UserId = $("#ddlUser").val();
            l.ManagerId = (i == "My" ? CurrentUser.Id : $("#ddlManager").val());
            l.SubstituteApproverId = $("#ddlSubstituteApprover").val();
            l.StartDate = $("#txtStartDate").val().StripTags();
            l.EndDate1 = $("#txtEndDate").val().StripTags();
            l.IsActive = $("#chbIsActive").prop("checked");
            if ($("#ddlManager").val() == $("#ddlSubstituteApprover").val()) {
                addMessage("Substitute Approver and Manager can't be the same person.", "warning");
                return
            }
            if (e == "Create") {
                var k = SubstituteApproverEdit.getSubstituteApproverByManagerId($("#ddlManager").val());
                if (k != null) {
                    addMessage("Substitute Approver for selected Manager already exists.", "warning");
                    return
                }
                SubstituteApproverEdit.createItem(l, i == "My")
            } else {
                if (e == "Edit") {
                    l.Id = g;
                    SubstituteApproverEdit.updateItem(l, i == "My")
                }
            }
        }
    });
    $.validator.addMethod("invalidDateRange", function (m, j) {
        var l = moment($("#txtStartDate").val()).utc();
        var k = moment($("#txtEndDate").val()).utc();
        return l.isValid() && k.isValid() && k.diff(l, "days") >= 0
    }, "Invalid date range (Start Date is greater than End Date)")
});
