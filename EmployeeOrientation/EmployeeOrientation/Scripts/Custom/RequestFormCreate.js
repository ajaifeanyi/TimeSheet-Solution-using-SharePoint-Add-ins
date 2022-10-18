/*"use strict";
var RequestFormCreate = window.RequestFormCreate || {};
RequestFormCreate = function () {
    var i = function () {
        var q = "";
        $.ajax({
            url: appweburl + "/_api/contextinfo",
            method: "POST",
            async: false,
            headers: {
                Accept: "application/json; odata=verbose"
            },
            cache: false,
            success: function (r) {
                q = r.d.GetContextWebInformation.FormDigestValue
            },
            error: function (r, s, t) {
                alert(t)
            }
        });
        return q
    }
        , d = function () {
            var q;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/Projects?$select=Id,Title,IsActive,ProjectMembersIDs,VisibilityLevel&$filter=IsActive&$orderby=Title asc",
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                async: false,
                success: function (r) {
                    q = r.d.results
                },
                error: function () {
                    console.log("error!!");
                    alert(thrownError)
                }
            });
            return q
        }
        , c = function () {
            var q;
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('Categories')/items?$select=Id,Title,IsActive1&$filter=IsActive1 eq 1&$orderBy=Title asc&$top=1000",
                type: "GET",
                async: false,
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                success: function (r) {
                    q = r.d.results
                },
                error: function () {
                    alert(thrownError)
                }
            });
            return q
        }
        , l = function (q) {
            var r;
            $.ajax({
                url: appweburl + "/_api/web/siteusers?$filter=Id eq " + q,
                contentType: "application/json; odata=verbose",
                async: false,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                cache: false,
                success: function (s) {
                    r = s.d.results[0]
                },
                error: function (u, s, t) {
                    alert(t)
                }
            });
            return r
        }
        , m = function (q) {
            var r;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/UserProfiles?$select=Id,FirstApproverId,FirstApproverName,SecondApproverId,SecondApproverName,HourlyRate&$filter=UserId eq " + q,
                //url: appweburl + "/_vti_bin/ListData.svc/UserProfiles?$select=ID,FirstApproverId,FirstApproverName,SecondApproverId,SecondApproverName,HourlyRate&$filter=qUserId eq"+q,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                async: false,
                success: function (s) {
                    r = s.d.results[0]
                },
                error: function (s, t, u) {
                    alert(u)
                }
            });
            return r
        }
        , k = function () {
            var q;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/Settings?$select=Id,Title,AppCategory,ApproversIDs,NumberOfApprovers,EnableAttachments,CustomFieldsSchema,CustomSheetFieldsSchema,PeriodType,ApprovalType,ProjectsEnabled,TitleEnabled,CategoryEnabled,NumberOfDecimalPlaces,DateFieldsMode",
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                async: false,
                success: function (r) {
                    q = r.d.results[0]
                },
                error: function (r, s, t) {
                    alert(t)
                }
            });
            return q
        }
        , j = function (q) {
            var r;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/UserProfiles/?$inlinecount=allpages&$select=User&$expand=User,Manager&$filter=ManagerId eq " + q,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                async: false,
                success: function (s) {
                    r = s.d.results
                },
                error: function (s, t, u) {
                    alert(u)
                }
            });
            return r
        }
        , e = function () {
            var q;
            $.ajax({
                url: appweburl + "/_api/web/siteusers?$filter=Email ne '' and substringof('SPOCrawler',Email) eq false and PrincipalType eq 1 and substringof('SPOCrawler',LoginName) eq false and substringof('SharePoint',Title) eq false and substringof('_SPO',Title) eq false and substringof('spocrwl',LoginName) eq false",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                cache: false,
                success: function (r) {
                    q = r.d.results
                },
                error: function (t, r, s) {
                    alert(s)
                }
            });
            return q
        }
        , b = function (r) {
            var q = i();
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('Requests')/items",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "POST",
                data: JSON.stringify(r),
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": q
                },
                success: function (s) {
                    if (isEmpty(SystemSettings.IntegrationStatus) == false && SystemSettings.IntegrationStatus == "true" && SystemSettings.IntegrationExportTriggers.indexOf("Draft") !== -1) {
                        r.Id = s.d.Id;
                        createExportListItem(SystemSettings.IntegrationListName, r, q, SystemSettings.IntegrationStandardFields.split(","), SystemSettings.IntegrationCustomFields.split(","))
                    }
                    if ($("input[type=file]").length > 1) {
                        $(".containerWrapper").loading({
                            theme: "light",
                            start: true,
                            message: "Uploading file..."
                        })
                    }
                    o(s.d.Id, q);
                    if ($("input[type=file]").length > 1) {
                        setTimeout(function () {
                            location.href = "RequestFormView.html?requestID=" + s.d.Id
                        }, 500)
                    } else {
                        location.href = "RequestFormView.html?requestID=" + s.d.Id
                    }
                },
                error: function (u, s, t) {
                    alert(t)
                }
            })
        }
        , a = function (u) {
            var s = ";base64,";
            var t = u.indexOf(s) + s.length;
            var r = u.substring(t);
            var w = window.atob(r);
            var x = w.length;
            var q = new Uint8Array(new ArrayBuffer(x));
            for (var v = 0; v < x; v++) {
                q[v] = w.charCodeAt(v)
            }
            return q
        }
        , o = function (r, q) {
            if ($("input[type=file]").length > 1 && !window.FileReader) {
                alert("You cannot upload file because HTML5 FileSystem APIs are not fully supported in this browser.")
            }
            $("input[type=file]").each(function () {
                var t = $(this).prop("files");
                var s = t[0];
                if (s) {
                    var u = new FileReader();
                    u.onload = function (v) {
                        p(r, s.name, v.target.result, q)
                    }
                        ;
                    u.readAsDataURL(s)
                }
            })
        }
        , p = function (t, r, q, s) {
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('Requests')/items(" + t + ")/AttachmentFiles/add(FileName='" + r + "')",
                type: "POST",
                async: false,
                processData: false,
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": s
                },
                data: a(q),
                error: function (w, u, v) { }
            })
        }
        , n = function () {
            var w = false;
            var x;
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('Licenses')/items?$select=ID,TrialStartDate,ActivationKey,IsInitialized,IsValid",
                type: "GET",
                async: false,
                cache: false,
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                success: function (y) {
                    x = y.d.results[0]
                },
                error: function (A, y, z) {
                    alert(z)
                }
            });
            if (x != null && x.IsValid == false) {
                $.notify.addStyle("warning", {
                    html: '<div class="notifyjs-corner" style="right:100px; left: 10px; top: 0px;"><div class="notifyjs-wrapper notifyjs-hidable"><div class="notifyjs-arrow"></div><div class="notifyjs-container"><div class="notifyjs-bootstrap-base notifyjs-bootstrap-warning notifyjsCustom"  style="margin-left:210px;" ><span data-notify-html="title"</span></div></div></div></div>'
                });
                $.notify.addStyle("error", {
                    html: '<div class="notifyjs-corner" style="right:100px; left: 10px; top: 0px;"><div class="notifyjs-wrapper notifyjs-hidable"><div class="notifyjs-arrow"></div><div class="notifyjs-container"><div class="notifyjs-bootstrap-base notifyjs-bootstrap-error notifyjsCustom"  style="margin-left:210px;" ><span data-notify-html="title"</span></div></div></div></div>'
                });
                var r = new Date();
                var v = i();
                $.ajax({
                    url: appweburl + "/_api/Web/lists/getbytitle('Settings')/getItemByStringId('1')",
                    type: "POST",
                    async: false,
                    contentType: "application/json;odata=verbose",
                    data: JSON.stringify({
                        __metadata: {
                            type: "SP.Data.SettingsListItem"
                        },
                        Title: "true"
                    }),
                    headers: {
                        accept: "application/json;odata=verbose",
                        "X-RequestDigest": v,
                        "X-Http-Method": "PATCH",
                        "IF-MATCH": "*"
                    },
                    success: function (y) {
                        $.ajax({
                            url: appweburl + "/_api/web/lists/getbytitle('Settings')/Items?$select=Modified&$filter=Id eq 1",
                            type: "GET",
                            async: false,
                            cache: false,
                            headers: {
                                accept: "application/json;odata=verbose"
                            },
                            dataType: "json",
                            success: function (z) {
                                if (z.d.results.length > 0) {
                                    r = moment(z.d.results[0].Modified)
                                }
                            }
                        })
                    },
                });
                var u = moment(x.TrialStartDate).add(14, "days");
                var q = moment(u).utc().diff(moment(r).utc());
                var t = Math.round(moment.duration(q).asDays());
                if (t > 0) {
                    var s = (t == 1 ? " day" : " days");
                    $.notify({
                        title: "Trial version will expire in  " + t + s + ". <a target='_blank' href='#' >Buy</a> a full license and enter <a href='Licenses.html' >Activation Key </a> "
                    }, {
                        style: "warning",
                        globalPosition: "top left",
                        clickToHide: true,
                        autoHideDelay: 20000
                    });
                    w = true
                } else {
                    w = false;
                    $.notify({
                        title: "Your trial period has expired. <a target='_blank' href='#' >Buy</a> a full license and enter <a href='Licenses.html' >Activation Key </a> "
                    }, {
                        style: "error",
                        globalPosition: "top left",
                        clickToHide: true,
                        autoHideDelay: 20000
                    })
                }
            } else {
                w = true
            }
            return w
        }
        , h = function () {
            var q;
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('EmailTemplates')/items?$select=ID,RequestSubmittedTitle,RequestSubmittedCC,RequestSubmittedBody,RequestRejectedTitle,RequestRejectedCC,RequestRejectedBody,RequestApprovedTitle,RequestApprovedCC,RequestApprovedBody",
                type: "GET",
                async: false,
                cache: false,
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                success: function (r) {
                    q = r.d.results[0]
                },
                error: function (t, r, s) {
                    alert(s)
                }
            });
            return q
        }
        , g = function (s, t, r) {
            var q;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/Requests/?$select=Id,Status&$filter=" + rowLimiterFilter + " RequesterId eq " + r + " and WeekNumber eq '" + s + "'  and Year eq '" + t + "'",
                type: "GET",
                async: false,
                cache: false,
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                success: function (u) {
                    q = u.d.results[0]
                },
                error: function (w, u, v) {
                    alert(v)
                }
            });
            return q
        }
        , f = function (q, t, s) {
            var r;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/Requests/?$select=Id,Status&$filter=" + rowLimiterFilter + "RequesterId eq " + s + " and Period eq '" + q + "'  and Year eq '" + t + "'",
                type: "GET",
                async: false,
                cache: false,
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                success: function (u) {
                    r = u.d.results[0]
                },
                error: function (w, u, v) {
                    alert(v)
                }
            });
            return r
        };
    return {
        getAllUsers: e,
        getUserProfileByUserId: m,
        getActiveProjects: d,
        getActiveCategories: c,
        getUserById: l,
        getRequestTemplate: k,
        createRequestForm: b,
        isValidLicense: n,
        getEmailTemplate: h,
        getMyEmployees: j,
        getCurrentWeekForCurrentUser: g,
        getCurrentMonthForCurrentUser: f
    }
}();
$(document).ready(function () {
    var F = getQueryStringParameter("firstDayOfPeriod");
    if (typeof F == "undefined") {
        location.href = "NotFound.html";
        return
    }
    var E = moment(decodeURI(F));
    var M = getQueryStringParameter("onBehalfOf");
    var H = false;
    if (typeof M != "undefined" && M == "true") {
        H = true;
        var N = (CurrentUser.IsAdmin || (CurrentUser.IsManager && SystemSettings.RequestOnBehalf == "manager"));
        if (N == false) {
            location.href = "AccessDenied.aspx";
            return
        }
    }
    var S = SystemSettings.WeekNumbering == "ISO" ? E.isoWeek() : E.week();
    var I = String(E.format("MMMM"));
    var T = String(E.year());
    if (S == 1) {
        I = String(moment(E).add("d", 7).format("MMMM"));
        T = String(moment(E).add("d", 7).year())
    }
    var O = RequestFormCreate.getRequestTemplate();
    if (isEmpty(O.NumberOfDecimalPlaces)) {
        O.NumberOfDecimalPlaces = "0.0"
    }
    var y;
    if (O.NumberOfDecimalPlaces == "0") {
        y = 0
    } else {
        if (O.NumberOfDecimalPlaces == "0.0") {
            y = 1
        } else {
            if (O.NumberOfDecimalPlaces == "0.00") {
                y = 2
            }
        }
    }
    $("#lblRequesterName").text(CurrentUser.Name);
    $("#hdnTotalHours").val(O.NumberOfDecimalPlaces);
    $("#lblTotalHours").text(SystemSettings.PeriodType + " hours total: " + numeral(0).format("0," + O.NumberOfDecimalPlaces));
    var R = null;
    var Q = 0;
    if (SystemSettings.BillableHours) {
        $("#lblBillableHours").show();
        $("#lblBillableHours").text("Billable hours: " + numeral(0).format("0," + O.NumberOfDecimalPlaces))
    }
    if (SystemSettings.BillingAmount) {
        $("#lblBillingAmountTotal").show();
        $("#lblBillingAmountTotal").text("Total billing amount: " + numeral(0).format("0," + O.NumberOfDecimalPlaces) + " " + SystemSettings.CurrencySymbol)
    }
    if (O == null) {
        location.href = "NotFound.html";
        return
    }
    jQuery("#requestFormCreate").validate({
        ignore: ".ignore",
        rules: {
            txtTitle: {
                required: true,
                maxlength: 250
            }
        },
        highlight: function (i) {
            jQuery(i).closest(".control-group").addClass("error")
        },
        success: function (i) {
            jQuery(i).closest(".control-group").removeClass("error")
        }
    });
    if (H) {
        var x = $("#ddlUser");
        x.show();
        if (CurrentUser.IsAdmin) {
            var c = RequestFormCreate.getAllUsers();
            $.each(c, function () {
                x.append($("<option>", {
                    value: this.Id,
                    name: this.Title,
                    text: this.Title + (isEmpty(this.Email) ? "" : "(" + this.Email + ")")
                }))
            })
        } else {
            var J = RequestFormCreate.getMyEmployees(CurrentUser.Id);
            if (J != null) {
                $.each(J, function () {
                    if (this.User != null) {
                        x.append($("<option>", {
                            value: this.User.Id,
                            name: this.User.Name,
                            text: this.User.Name + " (" + this.User.WorkEmail + ")"
                        }))
                    }
                })
            } else {
                addMessage("You have no subordinates assigned (go to Administration->User Profiles)", "warning")
            }
        }
        $("#ddlUser").rules("add", {
            required: true
        });
        x.on("change", function () {
            $("#btnSubmit").removeAttr("disabled");
            if (SystemSettings.BillingAmount && SystemSettings.HourlyRate == "user") {
                R = RequestFormCreate.getUserProfileByUserId(x.val());
                if (R == null || isEmpty(R.HourlyRate)) {
                    $("#btnSubmit").attr("disabled", "disabled");
                    addMessage("User hourly rate needs to be setup under Administration->User profiles.", "error");
                    return false
                }
                Q = parseFloat(R.HourlyRate)
            }
        })
    } else {
        $("#lblRequesterName").show()
    }
    var t = $.parseJSON(O.CustomFieldsSchema);
    $.each(t, function () {
        if (isEmpty(this.FieldName) == false && isEmpty(this.FieldType) == false && isEmpty(this.ColumnName) == false) {
            if (this.FieldType == "Single Line of Text") {
                $("#aRequestDetails").append(FormBuilder.renderInput(this.ColumnName, this.FieldName, ""));
                if (this.Required == "true") {
                    $("#" + this.ColumnName).rules("add", {
                        required: true
                    })
                }
            } else {
                if (this.FieldType == "Multiple Line of Text") {
                    $("#aRequestDetails").append(FormBuilder.renderTextArea(this.ColumnName, this.FieldName, ""))
                } else {
                    if (this.FieldType == "Number" || this.FieldType == "Currency") {
                        $("#aRequestDetails").append(FormBuilder.renderInput(this.ColumnName, this.FieldName, ""));
                        $("#" + this.ColumnName).rules("add", {
                            maxlength: 250,
                            number: true
                        })
                    } else {
                        if (this.FieldType == "Boolean") {
                            $("#aRequestDetails").append(FormBuilder.renderCheckbox(this.ColumnName, this.FieldName, false))
                        } else {
                            if (this.FieldType == "Choice") {
                                if (this.Options != null) {
                                    this.Options = this.Options.replace('"', "");
                                    var U = this.Options.split(",");
                                    $("#aRequestDetails").append(FormBuilder.renderSelect(this.ColumnName, this.FieldName, U, ""))
                                }
                            } else {
                                if (this.FieldType == "Multiple Choice") {
                                    if (this.Options != null) {
                                        this.Options = this.Options.replace('"', "");
                                        var U = this.Options.split(",");
                                        $("#aRequestDetails").append(FormBuilder.renderMultiSelect(this.ColumnName, this.FieldName, U, ""))
                                    }
                                } else {
                                    if (this.FieldType == "User") {
                                        var i = RequestFormCreate.getAllUsers();
                                        $("#aRequestDetails").append(FormBuilder.renderEmployeeSelect(this.ColumnName, this.FieldName, i, ""))
                                    } else {
                                        if (this.FieldType == "Date") {
                                            $("#aRequestDetails").append(FormBuilder.renderInput(this.ColumnName, this.FieldName, ""));
                                            $("#" + this.ColumnName).datepicker();
                                            if (this.Required == "true") {
                                                $("#" + this.ColumnName).rules("add", {
                                                    date: true
                                                })
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (isEmpty(this.Required) == false && this.Required == "true") {
                $("#" + this.ColumnName).rules("add", {
                    required: true
                })
            }
        }
    });
    $(".select2").select2({
        placeholder: "Select..."
    });
    $.datepicker.setDefaults({
        dateFormat: commonDateFormat,
        showButtonPanel: false,
        changeMonth: false,
        changeYear: false,
        firstDay: (SystemSettings.WeekNumbering == "Sunday" ? 0 : 1),
        defaultDate: moment(E).toDate()
    });
    if (SystemSettings.HourlyRate == "user" && H == false) {
        R = RequestFormCreate.getUserProfileByUserId(CurrentUser.Id);
        if (R == null || isEmpty(R.HourlyRate)) {
            addMessage("User hourly rate needs to be setup under Administration->User profiles.", "error");
            return false
        }
        Q = parseFloat(R.HourlyRate)
    }
    if (RequestFormCreate.isValidLicense() == false) {
        $("#btnSubmit").attr("disabled", "disabled");
        $("input, select, textarea").each(function (i) {
            var U = $(this);
            U.prop("disabled", true);
            U.attr("disabled", "disabled")
        })
    }
    $("#btnCancel").click(function () {
        location.href = "MyRequests.html?status=Draft"
    });
    if (O.EnableAttachments) {
        $(function () {
            $("#fileUpload").MultiFile({
                max: 10,
                STRING: {
                    remove: "Delete"
                }
            })
        })
    } else {
        $("#liAttachments").hide();
        $("#aAttachments").hide()
    }
    var a = function (V, X) {
        var ac = 0;
        var ab = {};
        if (SystemSettings.DailyTotals == "enabled") {
            for (var W = 1; W < K + 1; W++) {
                ab[W] = 0
            }
        }
        var U = 0;
        var aa = 0;
        var Y = $("#divTimeSheet").data("handsontable");
        var Z = Y.getData();
        $.each(Z, function () {
            if ($.isNumeric(this.Total)) {
                ac += parseFloat(this.Total)
            }
            if (SystemSettings.DailyTotals == "enabled") {
                for (var ad = 1; ad < K + 1; ad++) {
                    if (this[ad] != null && $.isNumeric(this[ad])) {
                        ab[ad] += parseFloat(this[ad])
                    }
                }
            }
            if (SystemSettings.BillableHours && $.isNumeric(this.Total) && this.Billable == "Yes") {
                U += parseFloat(this.Total)
            }
            if (SystemSettings.BillingAmount && $.isNumeric(this.Amount)) {
                aa += (parseFloat(this.Amount))
            }
        });
        if (SystemSettings.DailyTotals == "enabled") {
            for (var W = 1; W < K + 1; W++) {
                if (ab[W] != null && $.isNumeric(ab[W])) {
                    $("#td" + W).html(ab[W].toFixed(y))
                }
            }
        }
        $("#lblTotalHours").text(SystemSettings.PeriodType + " hours total: " + numeral(ac).format("0," + O.NumberOfDecimalPlaces));
        $("#hdnTotalHours").val(numeral(ac).format("0," + O.NumberOfDecimalPlaces));
        if (SystemSettings.BillableHours) {
            $("#lblBillableHours").text("Billable hours: " + numeral(U).format("0," + O.NumberOfDecimalPlaces));
            $("#hdnBillableHours").val(numeral(U).format("0," + O.NumberOfDecimalPlaces))
        }
        if (SystemSettings.BillingAmount) {
            $("#lblBillingAmountTotal").text("Total billing amount: " + numeral(aa).format("0," + O.NumberOfDecimalPlaces) + " " + SystemSettings.CurrencySymbol);
            $("#hdnBillingAmountTotal").val(numeral(aa).format("0," + O.NumberOfDecimalPlaces))
        }
    };
    var b = function (V, af) {
        var am = 0;
        var aj = 0;
        var al = {};
        if (SystemSettings.DailyTotals == "enabled") {
            for (var Z = 1; Z < K + 1; Z++) {
                al[Z] = 0
            }
        }
        var U = 0;
        var ai = 0;
        var ag = $("#divTimeSheet").data("handsontable");
        var ah = ag.getData();
        $.each(ah, function () {
            if ($.isNumeric(this.Total)) {
                am += parseFloat(this.Total)
            }
            if (SystemSettings.DailyTotals == "enabled") {
                for (var an = 1; an < K + 1; an++) {
                    if (this[an] != null && $.isNumeric(this[an])) {
                        al[an] += parseFloat(this[an])
                    }
                }
            }
            if (SystemSettings.BillableHours && $.isNumeric(this.Total) && this.Billable == "Yes") {
                U += parseFloat(this.Total)
            }
            if (SystemSettings.BillingAmount && $.isNumeric(this.Amount)) {
                ai += (parseFloat(this.Amount))
            }
        });
        if (SystemSettings.DailyTotals == "enabled") {
            for (var Z = 1; Z < K + 1; Z++) {
                if (al[Z] != null && $.isNumeric(al[Z])) {
                    $("#td" + Z).html(al[Z].toFixed(y))
                }
            }
        }
        $("#lblTotalHours").text(SystemSettings.PeriodType + " hours total: " + numeral(am).format("0," + O.NumberOfDecimalPlaces));
        $("#hdnTotalHours").val(numeral(am).format("0," + O.NumberOfDecimalPlaces));
        if (SystemSettings.BillableHours) {
            $("#lblBillableHours").text("Billable hours: " + numeral(U).format("0," + O.NumberOfDecimalPlaces));
            $("#hdnBillableHours").val(numeral(U).format("0," + O.NumberOfDecimalPlaces))
        }
        if (SystemSettings.BillingAmount) {
            $("#lblBillingAmountTotal").text("Total billing amount: " + numeral(ai).format("0," + O.NumberOfDecimalPlaces) + " " + SystemSettings.CurrencySymbol);
            $("#hdnBillingAmountTotal").val(numeral(ai).format("0," + O.NumberOfDecimalPlaces))
        }
        $("#txtExpenses").val(ag.isEmptyRow(0) ? "" : "false");
        if (V != null) {
            var W = V[0][1];
            if (W == "Amount") {
                return false
            }
            if (SystemSettings.DateFieldsMode != "ondemand" && W == "Total") {
                return false
            }
            if (SystemSettings.HourlyRate == "user" && W == "Rate") {
                return false
            }
            var ac = V[0][0];
            if (SystemSettings.DateFieldsMode != "ondemand") {
                for (var Z = L + s; Z < L + w + s; Z++) {
                    var X = $("#divTimeSheet").handsontable("getDataAtCell", ac, Z);
                    if (X != null && X != "") {
                        aj += parseFloat(X)
                    }
                }
                $("#divTimeSheet").handsontable("setDataAtCell", ac, L + w + s, aj.toFixed(y))
            } else {
                var ak = $("#divTimeSheet").handsontable("getDataAtCell", ac, L + w + s);
                if (ak != null) {
                    aj = parseFloat(ak)
                }
            }
            var aa = true;
            if (SystemSettings.BillableHours) {
                var ad = L == 0 ? L : L - 1;
                var ab = $("#divTimeSheet").handsontable("getDataAtCell", ac, ad);
                if (ab == null || ab == "No") {
                    aa = false
                }
            }
            if (SystemSettings.BillingAmount) {
                var ae = L + w + s + 1;
                var Y = $("#divTimeSheet").handsontable("getDataAtCell", ac, ae);
                if (aa && SystemSettings.HourlyRate == "user") {
                    $("#divTimeSheet").handsontable("setDataAtCell", ac, L + w + s + 2, (aj * Q).toFixed(y));
                    $("#divTimeSheet").handsontable("setDataAtCell", ac, ae, Q)
                } else {
                    if (aa && Y != null) {
                        $("#divTimeSheet").handsontable("setDataAtCell", ac, L + w + s + 2, (aj * Y).toFixed(y))
                    }
                }
                if (aa == false) {
                    $("#divTimeSheet").handsontable("setDataAtCell", ac, L + w + s + 2, "")
                }
            }
        }
    };
    var P = [];
    var C = [];
    var L = 0;
    var o = 0;
    var q = 2430;
    var w = 0;
    var D = moment(E).endOf("month");
    if (SystemSettings.PeriodType == "Weekly") {
        w = 7;
        q = 1480;
        $("#lblPeriod").text("Week " + String(S) + " " + T)
    } else {
        if (SystemSettings.PeriodType == "Bi-Weekly") {
            q = 1780;
            if (S == 53) {
                $("#lblPeriod").text("Week " + String(S) + " " + T);
                w = 7
            } else {
                $("#lblPeriod").text("Weeks " + String(S) + "-" + String(S + 1) + " " + T);
                w = 14
            }
        } else {
            if (SystemSettings.PeriodType == "Monthly") {
                q = 2430;
                $("#lblPeriod").text(I + " " + T);
                var v = moment(D).utc().diff(moment(E).utc());
                w = Math.round(moment.duration(v).asDays())
            } else {
                if (SystemSettings.PeriodType == "Semi-Monthly") {
                    q = 1780;
                    if (E.date() <= 15) {
                        $("#lblPeriod").text("1-15 " + E.format("MMMM") + " " + T);
                        w = 15
                    } else {
                        $("#lblPeriod").text("16-" + moment(E).endOf("month").date() + " " + E.format("MMMM"));
                        var v = moment(D).utc().diff(moment(E).utc());
                        w = Math.round(moment.duration(v).asDays())
                    }
                }
            }
        }
    }
    if (O.ProjectsEnabled != "false") {
        var e = new Array();
        var A = RequestFormCreate.getActiveProjects();
        $.each(A, function () {
            if (isEmpty(this.VisibilityLevel) || (isEmpty(this.ProjectMembersIDs) == false && this.ProjectMembersIDs.indexOf("," + CurrentUser.Id + ",") !== -1)) {
                e.push(this.Title)
            }
        });
        var k = new Object();
        k.data = "Project";
        k.title = "Project";
        k.width = 250;
        k.editor = "select";
        k.selectOptions = e;
        C.push(k);
        L++;
        o += 250
    }
    if (O.TitleEnabled != "false") {
        var m = new Object();
        m.data = "Title";
        m.title = "Task Title";
        m.width = 350;
        C.push(m);
        L++;
        o += 350
    }
    if (O.CategoryEnabled != "false") {
        var d = new Array();
        var z = RequestFormCreate.getActiveCategories();
        $.each(z, function () {
            d.push(this.Title)
        });
        var h = new Object();
        h.data = "Category";
        h.title = "Category";
        h.width = 250;
        h.editor = "select";
        h.selectOptions = d;
        C.push(h);
        L++;
        o += 250
    }
    if (SystemSettings.BillableHours) {
        var g = new Object();
        g.data = "Billable";
        g.title = "Billable?";
        g.width = 70;
        g.editor = "select";
        g.selectOptions = ["Yes", "No"];
        C.push(g);
        L++;
        o += 70;
        q += 100
    }
    var K = w;
    if (SystemSettings.DateFieldsMode == "ondemand") {
        q = 1480
    }
    if (SystemSettings.DateFieldsMode == "ondemand") {
        var j = new Object();
        j.data = "Date";
        j.title = "Date";
        j.width = 100;
        j.type = "date";
        j.showButtonPanel = false;
        j.changeMonth = false;
        j.changeYear = false;
        j.minDate = moment(E).add("d", -1).toDate();
        j.maxDate = moment(E).add("d", w).toDate();
        j.changeYear = false;
        C.push(j);
        w = 1
    }
    var u = $.parseJSON(O.CustomSheetFieldsSchema);
    var r = new Object();
    var s = 0;
    $.each(u, function () {
        if (isEmpty(this.FieldName) == false && isEmpty(this.FieldType) == false) {
            var i = new Object();
            i.data = this.FieldName;
            i.title = this.FieldName;
            i.width = (isEmpty(this.Width) ? 200 : Math.round(parseFloat(this.Width)));
            o += (isEmpty(this.Width) ? 200 : Math.round(parseFloat(this.Width)));
            q += i.width;
            if (this.FieldType == "Text") {
                i.type = "text";
                r[this.VariableName] = ""
            } else {
                if (this.FieldType == "Number") {
                    i.type = "numeric";
                    i.format = "0," + O.NumberOfDecimalPlaces;
                    i.language = "en";
                    i.allowInvalid = false;
                    r[this.VariableName] = ""
                } else {
                    if (this.FieldType == "Boolean") {
                        i.type = "checkbox";
                        i.checkedTemplate = "Yes";
                        i.uncheckedTemplate = "No";
                        i.className = "handsonTableCheckbox";
                        r[this.VariableName] = "No"
                    } else {
                        if (this.FieldType == "Choice") {
                            if (this.Options != null) {
                                i.editor = "select";
                                var X = [];
                                var W = this.Options.split(",");
                                for (var V in W) {
                                    var U = (V != null && W[V] != null ? W[V].trim() : "");
                                    if (U != "") {
                                        X.push(U)
                                    }
                                }
                                i.selectOptions = W
                            }
                            r[this.VariableName] = ""
                        } else {
                            if (this.FieldType == "Date") {
                                i.type = "date";
                                i.showButtonPanel = false;
                                i.changeMonth = false;
                                i.changeYear = false;
                                r[this.VariableName] = ""
                            }
                        }
                    }
                }
            }
            C.push(i);
            s++
        }
    });
    if (SystemSettings.DateFieldsMode != "ondemand" && SystemSettings.DailyTotals == "enabled") {
        $("#trDaysSummary").append('<td style="width:' + o + 'px;" ></td>');
        $("#tDaysSummary").show()
    }
    if (SystemSettings.DateFieldsMode != "ondemand") {
        for (var G = 1; G < w + 1; G++) {
            var p = new Object();
            p.data = String(G);
            p.title = "  " + E.format("ddd") + "<br/>" + E.format("D/MM");
            p.width = 40;
            p.type = "numeric";
            p.format = O.NumberOfDecimalPlaces,
                p.allowInvalid = false;
            C.push(p);
            E.add("d", 1);
            if (SystemSettings.DailyTotals == "enabled") {
                $("#trDaysSummary").append('<td class="totalSumPerDay" id="td' + String(G) + '" >0</td>')
            }
        }
    }
    var n = new Object();
    n.data = "Total";
    n.title = "Total<br/>hours";
    n.width = 50;
    if (SystemSettings.DateFieldsMode == "ondemand") {
        n.allowInvalid = false;
        n.type = "numeric";
        n.format = O.NumberOfDecimalPlaces;
        n.title = "Total hours";
        n.width = 80
    }
    n.readOnly = (SystemSettings.DateFieldsMode != "ondemand");
    C.push(n);
    if (SystemSettings.BillingAmount) {
        var l = new Object();
        l.data = "Rate";
        l.title = "Hourly<br/>rate";
        l.width = 60;
        l.readOnly = (SystemSettings.HourlyRate == "user");
        l.type = "numeric";
        l.format = "0," + O.NumberOfDecimalPlaces;
        l.language = "en";
        l.allowInvalid = false;
        C.push(l);
        var f = new Object();
        f.data = "Amount";
        f.title = "Billing<br/>amount";
        f.width = 60;
        f.type = "numeric";
        f.format = "0," + O.NumberOfDecimalPlaces;
        f.language = "en";
        f.allowInvalid = false;
        f.readOnly = true;
        C.push(f);
        q = q + 250
    }
    $(".containerWrapper").width(q);
    $("#divTimeSheet").handsontable({
        data: P,
        minSpareRows: 1,
        stretchH: "none",
        afterChange: b,
        afterRemoveRow: a,
        startRows: 1,
        className: "htCenter",
        multiSelect: false,
        contextMenu: ["row_above", "row_below", "remove_row"],
        columns: C
    });
    var B = false;
    $("#requestFormCreate").submit(function (W) {
        if ($("#requestFormCreate").valid() == false) {
            $("#formTabs").tabs("select", "#aRequestDetails");
            B = false;
            return
        }
        W.preventDefault();
        if (B) {
            return false
        }
        B = true;
        E = moment(decodeURI(F));
        var U = RequestFormCreate.getEmailTemplate();
        var V = (U != null ? U.Id : "");
        var i = $.parseJSON(O.CustomFieldsSchema);
        var ac = "";
        var Z = {
            __metadata: {
                type: "SP.Data.RequestsListItem"
            },
            SchemaInstance: O.CustomFieldsSchema,
            SheetSchemaInstance: O.CustomSheetFieldsSchema,
            ApprovalType: O.ApprovalType,
            ApprovalStatus: "0",
            NumberOfApprovers: "0",
            Status: RequestStatusEnum.Draft.Value,
            EnableAttachments: O.EnableAttachments,
            CurrentApproverId: "",
            SendEmailOnChange: false,
            FirstDayOfPeriod: F,
            FirstDayOfPeriodDate: F,
            NumberOfDays: String(K),
            Year: String(T),
            EmailTemplateId: String(V),
            ProjectsEnabled: O.ProjectsEnabled,
            TitleEnabled: O.TitleEnabled,
            CategoryEnabled: O.CategoryEnabled,
            NumberOfDecimalPlaces: O.NumberOfDecimalPlaces,
            HideFromDelve: true,
            DateFieldsMode: O.DateFieldsMode
        };
        if (H) {
            Z.RequesterName = $("#ddlUser option:selected").attr("name");
            Z.RequesterId = $("#ddlUser").val()
        } else {
            Z.RequesterName = CurrentUser.Name;
            Z.RequesterId = String(CurrentUser.Id)
        }
        if (SystemSettings.PeriodType == "Weekly") {
            Z.WeekNumber = String(S);
            Z.Period = "Week " + S
        } else {
            if (SystemSettings.PeriodType == "Bi-Weekly") {
                if (S == 53) {
                    Z.Period = "Week " + S;
                    Z.WeekNumber = String(S)
                } else {
                    Z.Period = "Weeks " + String(S) + "-" + String(S + 1);
                    Z.WeekNumber = String(S) + "-" + String(S + 1)
                }
            } else {
                if (SystemSettings.PeriodType == "Monthly") {
                    Z.Period = I
                } else {
                    if (SystemSettings.PeriodType == "Semi-Monthly") {
                        if (E.date() <= 15) {
                            Z.Period = "1-15 " + E.format("MMMM")
                        } else {
                            Z.Period = "16-" + moment(E).endOf("month").date() + " " + E.format("MMMM")
                        }
                    }
                }
            }
        }
        if (SystemSettings.PreventDuplicate == "enabled") {
            var af = (H ? $("#ddlUser").val() : String(CurrentUser.Id));
            var X = null;
            if (SystemSettings.PeriodType == "Weekly" || SystemSettings.PeriodType == "Bi-Weekly") {
                X = RequestFormCreate.getCurrentWeekForCurrentUser(Z.WeekNumber, T, af)
            } else {
                if (SystemSettings.PeriodType == "Monthly" || SystemSettings.PeriodType == "Semi-Monthly") {
                    X = RequestFormCreate.getCurrentMonthForCurrentUser(Z.Period, E.year(), af)
                }
            }
            if (X != null) {
                addMessage("Timesheet for given period already exists!", "error");
                return
            }
        }
        if (O.ApprovalType != "Auto-approved") {
            if (R == null) {
                R = (H ? RequestFormCreate.getUserProfileByUserId($("#ddlUser").val()) : RequestFormCreate.getUserProfileByUserId(CurrentUser.Id))
            }
            if (R == null) {
                addMessage("User profile doesn't exists! (to create user profile go to Administration->User profiles).", "error");
                B = false;
                return false
            }
            if (isEmpty(R.FirstApproverId) == false) {
                var Y = RequestFormCreate.getUserById(R.FirstApproverId);
                Z.FirstApproverEmail = Y.Email;
                Z.FirstApproverId = R.FirstApproverId;
                Z.NumberOfApprovers = "1"
            } else {
                addMessage("Approver is not defined in your user profile.", "error");
                B = false;
                return false
            }
            if (isEmpty(R.SecondApproverId) == false) {
                var ad = RequestFormCreate.getUserById(R.SecondApproverId);
                Z.SecondApproverEmail = ad.Email;
                Z.SecondApproverId = R.SecondApproverId;
                Z.NumberOfApprovers = "2"
            }
        }
        Z.TimeSheetJSON = JSON.stringify($("#divTimeSheet").data("handsontable").getData());
        Z.TotalHours = $("#hdnTotalHours").val();
        if (isEmpty(SystemSettings.MinHours) == false && $.isNumeric(SystemSettings.MinHours) && $.isNumeric($("#hdnTotalHours").val())) {
            var ab = parseFloat(SystemSettings.MinHours);
            var ae = parseFloat($("#hdnTotalHours").val());
            if (ae < ab) {
                addMessage("The minimum number of reported hours is " + ab, "warning");
                B = false;
                return
            }
        }
        if (isEmpty(SystemSettings.MaxHours) == false && $.isNumeric(SystemSettings.MaxHours) && $.isNumeric($("#hdnTotalHours").val())) {
            var aa = parseFloat(SystemSettings.MaxHours);
            var ae = parseFloat($("#hdnTotalHours").val());
            if (ae > aa) {
                addMessage("The maximum number of reported hours is " + aa, "warning");
                B = false;
                return
            }
        }
        if (SystemSettings.BillableHours) {
            Z.BillableHours = true;
            Z.BillableHoursAmount = $("#hdnBillableHours").val()
        }
        if (SystemSettings.BillingAmount) {
            Z.BillingAmount = true;
            Z.BillingAmountTotal = $("#hdnBillingAmountTotal").val();
            if (SystemSettings.HourlyRate == "user") {
                Z.HourlyRate = String(Q)
            }
        }
        $.each(i, function () {
            if (isEmpty(this.FieldName) == false && isEmpty(this.FieldType) == false && isEmpty(this.ColumnName) == false) {
                if (this.FieldType == "Boolean") {
                    Z[this.ColumnName] = $("#" + this.ColumnName).prop("checked") ? "Yes" : "No"
                } else {
                    if (this.FieldType == "Multiple Choice") {
                        Z[this.ColumnName] = $("#" + this.ColumnName).val() != null ? String($("#" + this.ColumnName).val()).trim() : ""
                    } else {
                        if (isEmpty($("#" + this.ColumnName).val()) == false) {
                            Z[this.ColumnName] = $("#" + this.ColumnName).val().StripTags()
                        } else {
                            Z[this.ColumnName] = ""
                        }
                    }
                }
            }
        });
        RequestFormCreate.createRequestForm(Z)
    })
});*/

"use strict";
var RequestFormCreate = window.RequestFormCreate || {};
RequestFormCreate = function () {
    var i = function () {
        var q = "";
        $.ajax({
            url: appweburl + "/_api/contextinfo",
            method: "POST",
            async: false,
            headers: {
                Accept: "application/json; odata=verbose"
            },
            cache: false,
            success: function (r) {
                q = r.d.GetContextWebInformation.FormDigestValue
            },
            error: function (r, s, t) {
                alert(t)
            }
        });
        return q
    }
        , d = function () {
            var q;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/Projects?$select=Id,Title,IsActive,ProjectMembersIDs,VisibilityLevel&$filter=IsActive&$orderby=Title asc",
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                async: false,
                success: function (r) {
                    q = r.d.results
                },
                error: function () {
                    console.log("error!!");
                    alert(thrownError)
                }
            });
            return q
        }
        , c = function () {
            var q;
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('Categories')/items?$select=Id,Title,IsActive1&$filter=IsActive1 eq 1&$orderBy=Title asc&$top=1000",
                type: "GET",
                async: false,
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                success: function (r) {
                    q = r.d.results
                },
                error: function () {
                    alert(thrownError)
                }
            });
            return q
        }
        , l = function (q) {
            var r;
            $.ajax({
                url: appweburl + "/_api/web/siteusers?$filter=Id eq " + q,
                contentType: "application/json; odata=verbose",
                async: false,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                cache: false,
                success: function (s) {
                    r = s.d.results[0]
                },
                error: function (u, s, t) {
                    alert(t)
                }
            });
            return r
        }
        , m = function (q) {
            var r;
            $.ajax({
               // url: appweburl + "/_vti_bin/ListData.svc/UserProfiles?$select=Id,FirstApproverId,FirstApproverName,SecondApproverId,SecondApproverName,HourlyRate&$filter=UserId eq " + q,
                url: appweburl + "/_vti_bin/ListData.svc/UserProfiles?$select=Id,FirstApproverId,FirstApproverName,SecondApproverId,SecondApproverName,HourlyRate&$filter=UserId eq " + q,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                async: false,
                success: function (s) {
                    r = s.d.results[0]
                },
                error: function (s, t, u) {
                    alert(u)
                }
            });
            return r
        }
        , k = function () {
            var q;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/Settings?$select=Id,Title,AppCategory,ApproversIDs,NumberOfApprovers,EnableAttachments,CustomFieldsSchema,CustomSheetFieldsSchema,PeriodType,ApprovalType,ProjectsEnabled,TitleEnabled,CategoryEnabled,NumberOfDecimalPlaces,DateFieldsMode",
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                async: false,
                success: function (r) {
                    q = r.d.results[0]
                },
                error: function (r, s, t) {
                    alert(t)
                }
            });
            return q
        }
        , j = function (q) {
            var r;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/UserProfiles/?$inlinecount=allpages&$select=User&$expand=User,Manager&$filter=ManagerId eq " + q,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                async: false,
                success: function (s) {
                    r = s.d.results
                },
                error: function (s, t, u) {
                    alert(u)
                }
            });
            return r
        }
        , e = function () {
            var q;
            $.ajax({
                url: appweburl + "/_api/web/siteusers?$filter=Email ne '' and substringof('SPOCrawler',Email) eq false and PrincipalType eq 1 and substringof('SPOCrawler',LoginName) eq false and substringof('SharePoint',Title) eq false and substringof('_SPO',Title) eq false and substringof('spocrwl',LoginName) eq false",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                cache: false,
                success: function (r) {
                    q = r.d.results
                },
                error: function (t, r, s) {
                    alert(s)
                }
            });
            return q
        }
        , b = function (r) {
            var q = i();
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('Requests')/items",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "POST",
                data: JSON.stringify(r),
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": q
                },
                success: function (s) {
                    if (isEmpty(SystemSettings.IntegrationStatus) == false && SystemSettings.IntegrationStatus == "true" && SystemSettings.IntegrationExportTriggers.indexOf("Draft") !== -1) {
                        r.Id = s.d.Id;
                        createExportListItem(SystemSettings.IntegrationListName, r, q, SystemSettings.IntegrationStandardFields.split(","), SystemSettings.IntegrationCustomFields.split(","))
                    }
                    if ($("input[type=file]").length > 1) {
                        $(".containerWrapper").loading({
                            theme: "light",
                            start: true,
                            message: "Uploading file..."
                        })
                    }
                    o(s.d.Id, q);
                    if ($("input[type=file]").length > 1) {
                        setTimeout(function () {
                            location.href = "RequestFormView.html?requestID=" + s.d.Id
                        }, 500)
                    } else {
                        location.href = "RequestFormView.html?requestID=" + s.d.Id
                    }
                },
                error: function (u, s, t) {
                    alert(t)
                }
            })
        }
        , a = function (u) {
            var s = ";base64,";
            var t = u.indexOf(s) + s.length;
            var r = u.substring(t);
            var w = window.atob(r);
            var x = w.length;
            var q = new Uint8Array(new ArrayBuffer(x));
            for (var v = 0; v < x; v++) {
                q[v] = w.charCodeAt(v)
            }
            return q
        }
        , o = function (r, q) {
            if ($("input[type=file]").length > 1 && !window.FileReader) {
                alert("You cannot upload file because HTML5 FileSystem APIs are not fully supported in this browser.")
            }
            $("input[type=file]").each(function () {
                var t = $(this).prop("files");
                var s = t[0];
                if (s) {
                    var u = new FileReader();
                    u.onload = function (v) {
                        p(r, s.name, v.target.result, q)
                    }
                        ;
                    u.readAsDataURL(s)
                }
            })
        }
        , p = function (t, r, q, s) {
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('Requests')/items(" + t + ")/AttachmentFiles/add(FileName='" + r + "')",
                type: "POST",
                async: false,
                processData: false,
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": s
                },
                data: a(q),
                error: function (w, u, v) { }
            })
        }
        , n = function () {
            var w = false;
            var x;
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('Licenses')/items?$select=ID,TrialStartDate,ActivationKey,IsInitialized,IsValid",
                type: "GET",
                async: false,
                cache: false,
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                success: function (y) {
                    x = y.d.results[0]
                },
                error: function (A, y, z) {
                    alert(z)
                }
            });
            if (x != null && x.IsValid == false) {
                $.notify.addStyle("warning", {
                    html: '<div class="notifyjs-corner" style="right:100px; left: 10px; top: 0px;"><div class="notifyjs-wrapper notifyjs-hidable"><div class="notifyjs-arrow"></div><div class="notifyjs-container"><div class="notifyjs-bootstrap-base notifyjs-bootstrap-warning notifyjsCustom"  style="margin-left:210px;" ><span data-notify-html="title"</span></div></div></div></div>'
                });
                $.notify.addStyle("error", {
                    html: '<div class="notifyjs-corner" style="right:100px; left: 10px; top: 0px;"><div class="notifyjs-wrapper notifyjs-hidable"><div class="notifyjs-arrow"></div><div class="notifyjs-container"><div class="notifyjs-bootstrap-base notifyjs-bootstrap-error notifyjsCustom"  style="margin-left:210px;" ><span data-notify-html="title"</span></div></div></div></div>'
                });
                var r = new Date();
                var v = i();
                $.ajax({
                    url: appweburl + "/_api/Web/lists/getbytitle('Settings')/getItemByStringId('1')",
                    type: "POST",
                    async: false,
                    contentType: "application/json;odata=verbose",
                    data: JSON.stringify({
                        __metadata: {
                            type: "SP.Data.SettingsListItem"
                        },
                        Title: "true"
                    }),
                    headers: {
                        accept: "application/json;odata=verbose",
                        "X-RequestDigest": v,
                        "X-Http-Method": "PATCH",
                        "IF-MATCH": "*"
                    },
                    success: function (y) {
                        $.ajax({
                            url: appweburl + "/_api/web/lists/getbytitle('Settings')/Items?$select=Modified&$filter=Id eq 1",
                            type: "GET",
                            async: false,
                            cache: false,
                            headers: {
                                accept: "application/json;odata=verbose"
                            },
                            dataType: "json",
                            success: function (z) {
                                if (z.d.results.length > 0) {
                                    r = moment(z.d.results[0].Modified)
                                }
                            }
                        })
                    },
                });
                var u = moment(x.TrialStartDate).add(14, "days");
                var q = moment(u).utc().diff(moment(r).utc());
                var t = Math.round(moment.duration(q).asDays());
                if (t > 0) {
                    var s = (t == 1 ? " day" : " days");
                    $.notify({
                        title: "Trial version will expire in  " + t + s + ". <a target='_blank' href='#' >Buy</a> a full license and enter <a href='Licenses.html' >Activation Key </a> "
                    }, {
                        style: "warning",
                        globalPosition: "top left",
                        clickToHide: true,
                        autoHideDelay: 20000
                    });
                    w = true
                } else {
                    w = false;
                    $.notify({
                        title: "Your trial period has expired. <a target='_blank' href='#' >Buy</a> a full license and enter <a href='Licenses.html' >Activation Key </a> "
                    }, {
                        style: "error",
                        globalPosition: "top left",
                        clickToHide: true,
                        autoHideDelay: 20000
                    })
                }
            } else {
                w = true
            }
            return w
        }
        , h = function () {
            var q;
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('EmailTemplates')/items?$select=ID,RequestSubmittedTitle,RequestSubmittedCC,RequestSubmittedBody,RequestRejectedTitle,RequestRejectedCC,RequestRejectedBody,RequestApprovedTitle,RequestApprovedCC,RequestApprovedBody",
                type: "GET",
                async: false,
                cache: false,
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                success: function (r) {
                    q = r.d.results[0]
                },
                error: function (t, r, s) {
                    alert(s)
                }
            });
            return q
        }
        , g = function (s, t, r) {
            var q;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/Requests/?$select=Id,Statu&$filter=" + rowLimiterFilter + " RequesterId eq " + r + " and WeekNumber eq '" + s + "'  and Year eq '" + t + "'",
                type: "GET",
                async: false,
                cache: false,
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                success: function (u) {
                    q = u.d.results[0]
                },
                error: function (w, u, v) {
                    alert(v)
                }
            });
            return q
        }
        , f = function (q, t, s) {
            var r;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/Requests/?$select=Id,Statu&$filter=" + rowLimiterFilter + "RequesterId eq " + s + " and Period eq '" + q + "'  and Year eq '" + t + "'",
                type: "GET",
                async: false,
                cache: false,
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                success: function (u) {
                    r = u.d.results[0]
                },
                error: function (w, u, v) {
                    alert(v)
                }
            });
            return r
        };
    return {
        getAllUsers: e,
        getUserProfileByUserId: m,
        getActiveProjects: d,
        getActiveCategories: c,
        getUserById: l,
        getRequestTemplate: k,
        createRequestForm: b,
        isValidLicense: n,
        getEmailTemplate: h,
        getMyEmployees: j,
        getCurrentWeekForCurrentUser: g,
        getCurrentMonthForCurrentUser: f
    }
}();
$(document).ready(function () {
    var F = getQueryStringParameter("firstDayOfPeriod");
    if (typeof F == "undefined") {
        location.href = "NotFound.aspx";
        return
    }
    var E = moment(decodeURI(F));
    var M = getQueryStringParameter("onBehalfOf");
    var H = false;
    if (typeof M != "undefined" && M == "true") {
        H = true;
        var N = (CurrentUser.IsAdmin || (CurrentUser.IsManager && SystemSettings.RequestOnBehalf == "manager"));
        if (N == false) {
            location.href = "AccessDenied.aspx";
            return
        }
    }
    var S = SystemSettings.WeekNumbering == "ISO" ? E.isoWeek() : E.week();
    var I = String(E.format("MMMM"));
    var T = String(E.year());
    if (S == 1) {
        I = String(moment(E).add("d", 7).format("MMMM"));
        T = String(moment(E).add("d", 7).year())
    }
    var O = RequestFormCreate.getRequestTemplate();
    if (isEmpty(O.NumberOfDecimalPlaces)) {
        O.NumberOfDecimalPlaces = "0.0"
    }
    var y;
    if (O.NumberOfDecimalPlaces == "0") {
        y = 0
    } else {
        if (O.NumberOfDecimalPlaces == "0.0") {
            y = 1
        } else {
            if (O.NumberOfDecimalPlaces == "0.00") {
                y = 2
            }
        }
    }
    $("#lblRequesterName").text(CurrentUser.Name);
    $("#hdnTotalHours").val(O.NumberOfDecimalPlaces);
    $("#lblTotalHours").text(SystemSettings.PeriodType + " hours total: " + numeral(0).format("0," + O.NumberOfDecimalPlaces));
    var R = null;
    var Q = 0;
    if (SystemSettings.BillableHours) {
        $("#lblBillableHours").show();
        $("#lblBillableHours").text("Billable hours: " + numeral(0).format("0," + O.NumberOfDecimalPlaces))
    }
    if (SystemSettings.BillingAmount) {
        $("#lblBillingAmountTotal").show();
        $("#lblBillingAmountTotal").text("Total billing amount: " + numeral(0).format("0," + O.NumberOfDecimalPlaces) + " " + SystemSettings.CurrencySymbol)
    }
    if (O == null) {
        location.href = "NotFound.aspx";
        return
    }
    jQuery("#requestFormCreate").validate({
        ignore: ".ignore",
        rules: {
            txtTitle: {
                required: true,
                maxlength: 250
            }
        },
        highlight: function (i) {
            jQuery(i).closest(".control-group").addClass("error")
        },
        success: function (i) {
            jQuery(i).closest(".control-group").removeClass("error")
        }
    });
    if (H) {
        var x = $("#ddlUser");
        x.show();
        if (CurrentUser.IsAdmin) {
            var c = RequestFormCreate.getAllUsers();
            $.each(c, function () {
                x.append($("<option>", {
                    value: this.Id,
                    name: this.Title,
                    text: this.Title + (isEmpty(this.Email) ? "" : "(" + this.Email + ")")
                }))
            })
        } else {
            var J = RequestFormCreate.getMyEmployees(CurrentUser.Id);
            if (J != null) {
                $.each(J, function () {
                    if (this.User != null) {
                        x.append($("<option>", {
                            value: this.User.Id,
                            name: this.User.Name,
                            text: this.User.Name + " (" + this.User.WorkEmail + ")"
                        }))
                    }
                })
            } else {
                addMessage("You have no subordinates assigned (go to Administration->User Profiles)", "warning")
            }
        }
        $("#ddlUser").rules("add", {
            required: true
        });
        x.on("change", function () {
            $("#btnSubmit").removeAttr("disabled");
            if (SystemSettings.BillingAmount && SystemSettings.HourlyRate == "user") {
                R = RequestFormCreate.getUserProfileByUserId(x.val());
                if (R == null || isEmpty(R.HourlyRate)) {
                    $("#btnSubmit").attr("disabled", "disabled");
                    addMessage("User hourly rate needs to be setup under Administration->User profiles.", "error");
                    return false
                }
                Q = parseFloat(R.HourlyRate)
            }
        })
    } else {
        $("#lblRequesterName").show()
    }
    var t = $.parseJSON(O.CustomFieldsSchema);
    $.each(t, function () {
        if (isEmpty(this.FieldName) == false && isEmpty(this.FieldType) == false && isEmpty(this.ColumnName) == false) {
            if (this.FieldType == "Single Line of Text") {
                $("#aRequestDetails").append(FormBuilder.renderInput(this.ColumnName, this.FieldName, ""));
                if (this.Required == "true") {
                    $("#" + this.ColumnName).rules("add", {
                        required: true
                    })
                }
            } else {
                if (this.FieldType == "Multiple Line of Text") {
                    $("#aRequestDetails").append(FormBuilder.renderTextArea(this.ColumnName, this.FieldName, ""))
                } else {
                    if (this.FieldType == "Number" || this.FieldType == "Currency") {
                        $("#aRequestDetails").append(FormBuilder.renderInput(this.ColumnName, this.FieldName, ""));
                        $("#" + this.ColumnName).rules("add", {
                            maxlength: 250,
                            number: true
                        })
                    } else {
                        if (this.FieldType == "Boolean") {
                            $("#aRequestDetails").append(FormBuilder.renderCheckbox(this.ColumnName, this.FieldName, false))
                        } else {
                            if (this.FieldType == "Choice") {
                                if (this.Options != null) {
                                    this.Options = this.Options.replace('"', "");
                                    var U = this.Options.split(",");
                                    $("#aRequestDetails").append(FormBuilder.renderSelect(this.ColumnName, this.FieldName, U, ""))
                                }
                            } else {
                                if (this.FieldType == "Multiple Choice") {
                                    if (this.Options != null) {
                                        this.Options = this.Options.replace('"', "");
                                        var U = this.Options.split(",");
                                        $("#aRequestDetails").append(FormBuilder.renderMultiSelect(this.ColumnName, this.FieldName, U, ""))
                                    }
                                } else {
                                    if (this.FieldType == "User") {
                                        var i = RequestFormCreate.getAllUsers();
                                        $("#aRequestDetails").append(FormBuilder.renderEmployeeSelect(this.ColumnName, this.FieldName, i, ""))
                                    } else {
                                        if (this.FieldType == "Date") {
                                            $("#aRequestDetails").append(FormBuilder.renderInput(this.ColumnName, this.FieldName, ""));
                                            $("#" + this.ColumnName).datepicker();
                                            if (this.Required == "true") {
                                                $("#" + this.ColumnName).rules("add", {
                                                    date: true
                                                })
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (isEmpty(this.Required) == false && this.Required == "true") {
                $("#" + this.ColumnName).rules("add", {
                    required: true
                })
            }
        }
    });
    $(".select2").select2({
        placeholder: "Select..."
    });
    $.datepicker.setDefaults({
        dateFormat: commonDateFormat,
        showButtonPanel: false,
        changeMonth: false,
        changeYear: false,
        firstDay: (SystemSettings.WeekNumbering == "Sunday" ? 0 : 1),
        defaultDate: moment(E).toDate()
    });
    if (SystemSettings.HourlyRate == "user" && H == false) {
        R = RequestFormCreate.getUserProfileByUserId(CurrentUser.Id);
        if (R == null || isEmpty(R.HourlyRate)) {
            addMessage("User hourly rate needs to be setup under Administration->User profiles.", "error");
            return false
        }
        Q = parseFloat(R.HourlyRate)
    }
    if (RequestFormCreate.isValidLicense() == false) {
        $("#btnSubmit").attr("disabled", "disabled");
        $("input, select, textarea").each(function (i) {
            var U = $(this);
            U.prop("disabled", true);
            U.attr("disabled", "disabled")
        })
    }
    $("#btnCancel").click(function () {
        location.href = "MyRequests.html?status=Draft"
    });
    if (O.EnableAttachments) {
        $(function () {
            $("#fileUpload").MultiFile({
                max: 10,
                STRING: {
                    remove: "Delete"
                }
            })
        })
    } else {
        $("#liAttachments").hide();
        $("#aAttachments").hide()
    }
    var a = function (V, X) {
        var ac = 0;
        var ab = {};
        if (SystemSettings.DailyTotals == "enabled") {
            for (var W = 1; W < K + 1; W++) {
                ab[W] = 0
            }
        }
        var U = 0;
        var aa = 0;
        var Y = $("#divTimeSheet").data("handsontable");
        var Z = Y.getData();
        $.each(Z, function () {
            if ($.isNumeric(this.Total)) {
                ac += parseFloat(this.Total)
            }
            if (SystemSettings.DailyTotals == "enabled") {
                for (var ad = 1; ad < K + 1; ad++) {
                    if (this[ad] != null && $.isNumeric(this[ad])) {
                        ab[ad] += parseFloat(this[ad])
                    }
                }
            }
            if (SystemSettings.BillableHours && $.isNumeric(this.Total) && this.Billable == "Yes") {
                U += parseFloat(this.Total)
            }
            if (SystemSettings.BillingAmount && $.isNumeric(this.Amount)) {
                aa += (parseFloat(this.Amount))
            }
        });
        if (SystemSettings.DailyTotals == "enabled") {
            for (var W = 1; W < K + 1; W++) {
                if (ab[W] != null && $.isNumeric(ab[W])) {
                    $("#td" + W).html(ab[W].toFixed(y))
                }
            }
        }
        $("#lblTotalHours").text(SystemSettings.PeriodType + " hours total: " + numeral(ac).format("0," + O.NumberOfDecimalPlaces));
        $("#hdnTotalHours").val(numeral(ac).format("0," + O.NumberOfDecimalPlaces));
        if (SystemSettings.BillableHours) {
            $("#lblBillableHours").text("Billable hours: " + numeral(U).format("0," + O.NumberOfDecimalPlaces));
            $("#hdnBillableHours").val(numeral(U).format("0," + O.NumberOfDecimalPlaces))
        }
        if (SystemSettings.BillingAmount) {
            $("#lblBillingAmountTotal").text("Total billing amount: " + numeral(aa).format("0," + O.NumberOfDecimalPlaces) + " " + SystemSettings.CurrencySymbol);
            $("#hdnBillingAmountTotal").val(numeral(aa).format("0," + O.NumberOfDecimalPlaces))
        }
    };
    var b = function (V, af) {
        var am = 0;
        var aj = 0;
        var al = {};
        if (SystemSettings.DailyTotals == "enabled") {
            for (var Z = 1; Z < K + 1; Z++) {
                al[Z] = 0
            }
        }
        var U = 0;
        var ai = 0;
        var ag = $("#divTimeSheet").data("handsontable");
        var ah = ag.getData();
        $.each(ah, function () {
            if ($.isNumeric(this.Total)) {
                am += parseFloat(this.Total)
            }
            if (SystemSettings.DailyTotals == "enabled") {
                for (var an = 1; an < K + 1; an++) {
                    if (this[an] != null && $.isNumeric(this[an])) {
                        al[an] += parseFloat(this[an])
                    }
                }
            }
            if (SystemSettings.BillableHours && $.isNumeric(this.Total) && this.Billable == "Yes") {
                U += parseFloat(this.Total)
            }
            if (SystemSettings.BillingAmount && $.isNumeric(this.Amount)) {
                ai += (parseFloat(this.Amount))
            }
        });
        if (SystemSettings.DailyTotals == "enabled") {
            for (var Z = 1; Z < K + 1; Z++) {
                if (al[Z] != null && $.isNumeric(al[Z])) {
                    $("#td" + Z).html(al[Z].toFixed(y))
                }
            }
        }
        $("#lblTotalHours").text(SystemSettings.PeriodType + " hours total: " + numeral(am).format("0," + O.NumberOfDecimalPlaces));
        $("#hdnTotalHours").val(numeral(am).format("0," + O.NumberOfDecimalPlaces));
        if (SystemSettings.BillableHours) {
            $("#lblBillableHours").text("Billable hours: " + numeral(U).format("0," + O.NumberOfDecimalPlaces));
            $("#hdnBillableHours").val(numeral(U).format("0," + O.NumberOfDecimalPlaces))
        }
        if (SystemSettings.BillingAmount) {
            $("#lblBillingAmountTotal").text("Total billing amount: " + numeral(ai).format("0," + O.NumberOfDecimalPlaces) + " " + SystemSettings.CurrencySymbol);
            $("#hdnBillingAmountTotal").val(numeral(ai).format("0," + O.NumberOfDecimalPlaces))
        }
        $("#txtExpenses").val(ag.isEmptyRow(0) ? "" : "false");
        if (V != null) {
            var W = V[0][1];
            if (W == "Amount") {
                return false
            }
            if (SystemSettings.DateFieldsMode != "ondemand" && W == "Total") {
                return false
            }
            if (SystemSettings.HourlyRate == "user" && W == "Rate") {
                return false
            }
            var ac = V[0][0];
            if (SystemSettings.DateFieldsMode != "ondemand") {
                for (var Z = L + s; Z < L + w + s; Z++) {
                    var X = $("#divTimeSheet").handsontable("getDataAtCell", ac, Z);
                    if (X != null && X != "") {
                        aj += parseFloat(X)
                    }
                }
                $("#divTimeSheet").handsontable("setDataAtCell", ac, L + w + s, aj.toFixed(y))
            } else {
                var ak = $("#divTimeSheet").handsontable("getDataAtCell", ac, L + w + s);
                if (ak != null) {
                    aj = parseFloat(ak)
                }
            }
            var aa = true;
            if (SystemSettings.BillableHours) {
                var ad = L == 0 ? L : L - 1;
                var ab = $("#divTimeSheet").handsontable("getDataAtCell", ac, ad);
                if (ab == null || ab == "No") {
                    aa = false
                }
            }
            if (SystemSettings.BillingAmount) {
                var ae = L + w + s + 1;
                var Y = $("#divTimeSheet").handsontable("getDataAtCell", ac, ae);
                if (aa && SystemSettings.HourlyRate == "user") {
                    $("#divTimeSheet").handsontable("setDataAtCell", ac, L + w + s + 2, (aj * Q).toFixed(y));
                    $("#divTimeSheet").handsontable("setDataAtCell", ac, ae, Q)
                } else {
                    if (aa && Y != null) {
                        $("#divTimeSheet").handsontable("setDataAtCell", ac, L + w + s + 2, (aj * Y).toFixed(y))
                    }
                }
                if (aa == false) {
                    $("#divTimeSheet").handsontable("setDataAtCell", ac, L + w + s + 2, "")
                }
            }
        }
    };
    var P = [];
    var C = [];
    var L = 0;
    var o = 0;
    var q = 2430;
    var w = 0;
    var D = moment(E).endOf("month");
    if (SystemSettings.PeriodType == "Weekly") {
        w = 7;
        q = 1480;
        $("#lblPeriod").text("Week " + String(S) + " " + T)
    } else {
        if (SystemSettings.PeriodType == "Bi-Weekly") {
            q = 1780;
            if (S == 53) {
                $("#lblPeriod").text("Week " + String(S) + " " + T);
                w = 7
            } else {
                $("#lblPeriod").text("Weeks " + String(S) + "-" + String(S + 1) + " " + T);
                w = 14
            }
        } else {
            if (SystemSettings.PeriodType == "Monthly") {
                q = 2430;
                $("#lblPeriod").text(I + " " + T);
                var v = moment(D).utc().diff(moment(E).utc());
                w = Math.round(moment.duration(v).asDays())
            } else {
                if (SystemSettings.PeriodType == "Semi-Monthly") {
                    q = 1780;
                    if (E.date() <= 15) {
                        $("#lblPeriod").text("1-15 " + E.format("MMMM") + " " + T);
                        w = 15
                    } else {
                        $("#lblPeriod").text("16-" + moment(E).endOf("month").date() + " " + E.format("MMMM"));
                        var v = moment(D).utc().diff(moment(E).utc());
                        w = Math.round(moment.duration(v).asDays())
                    }
                }
            }
        }
    }
    if (O.ProjectsEnabled != "false") {
        var e = new Array();
        var A = RequestFormCreate.getActiveProjects();
        $.each(A, function () {
            if (isEmpty(this.VisibilityLevel) || (isEmpty(this.ProjectMembersIDs) == false && this.ProjectMembersIDs.indexOf("," + CurrentUser.Id + ",") !== -1)) {
                e.push(this.Title)
            }
        });
        var k = new Object();
        k.data = "Project";
        k.title = "Project";
        k.width = 250;
        k.editor = "select";
        k.selectOptions = e;
        C.push(k);
        L++;
        o += 250
    }
    if (O.TitleEnabled != "false") {
        var m = new Object();
        m.data = "Title";
        m.title = "Task Title";
        m.width = 350;
        C.push(m);
        L++;
        o += 350
    }
    if (O.CategoryEnabled != "false") {
        var d = new Array();
        var z = RequestFormCreate.getActiveCategories();
        $.each(z, function () {
            d.push(this.Title)
        });
        var h = new Object();
        h.data = "Category";
        h.title = "Category";
        h.width = 250;
        h.editor = "select";
        h.selectOptions = d;
        C.push(h);
        L++;
        o += 250
    }
    if (SystemSettings.BillableHours) {
        var g = new Object();
        g.data = "Billable";
        g.title = "Billable?";
        g.width = 70;
        g.editor = "select";
        g.selectOptions = ["Yes", "No"];
        C.push(g);
        L++;
        o += 70;
        q += 100
    }
    var K = w;
    if (SystemSettings.DateFieldsMode == "ondemand") {
        q = 1480
    }
    if (SystemSettings.DateFieldsMode == "ondemand") {
        var j = new Object();
        j.data = "Date";
        j.title = "Date";
        j.width = 100;
        j.type = "date";
        j.showButtonPanel = false;
        j.changeMonth = false;
        j.changeYear = false;
        j.minDate = moment(E).add("d", -1).toDate();
        j.maxDate = moment(E).add("d", w).toDate();
        j.changeYear = false;
        C.push(j);
        w = 1
    }
    var u = $.parseJSON(O.CustomSheetFieldsSchema);
    var r = new Object();
    var s = 0;
    $.each(u, function () {
        if (isEmpty(this.FieldName) == false && isEmpty(this.FieldType) == false) {
            var i = new Object();
            i.data = this.FieldName;
            i.title = this.FieldName;
            i.width = (isEmpty(this.Width) ? 200 : Math.round(parseFloat(this.Width)));
            o += (isEmpty(this.Width) ? 200 : Math.round(parseFloat(this.Width)));
            q += i.width;
            if (this.FieldType == "Text") {
                i.type = "text";
                r[this.VariableName] = ""
            } else {
                if (this.FieldType == "Number") {
                    i.type = "numeric";
                    i.format = "0," + O.NumberOfDecimalPlaces;
                    i.language = "en";
                    i.allowInvalid = false;
                    r[this.VariableName] = ""
                } else {
                    if (this.FieldType == "Boolean") {
                        i.type = "checkbox";
                        i.checkedTemplate = "Yes";
                        i.uncheckedTemplate = "No";
                        i.className = "handsonTableCheckbox";
                        r[this.VariableName] = "No"
                    } else {
                        if (this.FieldType == "Choice") {
                            if (this.Options != null) {
                                i.editor = "select";
                                var X = [];
                                var W = this.Options.split(",");
                                for (var V in W) {
                                    var U = (V != null && W[V] != null ? W[V].trim() : "");
                                    if (U != "") {
                                        X.push(U)
                                    }
                                }
                                i.selectOptions = W
                            }
                            r[this.VariableName] = ""
                        } else {
                            if (this.FieldType == "Date") {
                                i.type = "date";
                                i.showButtonPanel = false;
                                i.changeMonth = false;
                                i.changeYear = false;
                                r[this.VariableName] = ""
                            }
                        }
                    }
                }
            }
            C.push(i);
            s++
        }
    });
    if (SystemSettings.DateFieldsMode != "ondemand" && SystemSettings.DailyTotals == "enabled") {
        $("#trDaysSummary").append('<td style="width:' + o + 'px;" ></td>');
        $("#tDaysSummary").show()
    }
    if (SystemSettings.DateFieldsMode != "ondemand") {
        for (var G = 1; G < w + 1; G++) {
            var p = new Object();
            p.data = String(G);
            p.title = "  " + E.format("ddd") + "<br/>" + E.format("D/MM");
            p.width = 40;
            p.type = "numeric";
            p.format = O.NumberOfDecimalPlaces,
                p.allowInvalid = false;
            C.push(p);
            E.add("d", 1);
            if (SystemSettings.DailyTotals == "enabled") {
                $("#trDaysSummary").append('<td class="totalSumPerDay" id="td' + String(G) + '" >0</td>')
            }
        }
    }
    var n = new Object();
    n.data = "Total";
    n.title = "Total<br/>hours";
    n.width = 50;
    if (SystemSettings.DateFieldsMode == "ondemand") {
        n.allowInvalid = false;
        n.type = "numeric";
        n.format = O.NumberOfDecimalPlaces;
        n.title = "Total hours";
        n.width = 80
    }
    n.readOnly = (SystemSettings.DateFieldsMode != "ondemand");
    C.push(n);
    if (SystemSettings.BillingAmount) {
        var l = new Object();
        l.data = "Rate";
        l.title = "Hourly<br/>rate";
        l.width = 60;
        l.readOnly = (SystemSettings.HourlyRate == "user");
        l.type = "numeric";
        l.format = "0," + O.NumberOfDecimalPlaces;
        l.language = "en";
        l.allowInvalid = false;
        C.push(l);
        var f = new Object();
        f.data = "Amount";
        f.title = "Billing<br/>amount";
        f.width = 60;
        f.type = "numeric";
        f.format = "0," + O.NumberOfDecimalPlaces;
        f.language = "en";
        f.allowInvalid = false;
        f.readOnly = true;
        C.push(f);
        q = q + 250
    }
    $(".containerWrapper").width(q);
    $("#divTimeSheet").handsontable({
        data: P,
        minSpareRows: 1,
        stretchH: "none",
        afterChange: b,
        afterRemoveRow: a,
        startRows: 1,
        className: "htCenter",
        multiSelect: false,
        contextMenu: ["row_above", "row_below", "remove_row"],
        columns: C
    });
    var B = false;
    $("#requestFormCreate").submit(function (W) {
        if ($("#requestFormCreate").valid() == false) {
            $("#formTabs").tabs("select", "#aRequestDetails");
            B = false;
            return
        }
        W.preventDefault();
        if (B) {
            return false
        }
        B = true;
        E = moment(decodeURI(F));
        var U = RequestFormCreate.getEmailTemplate();
        var V = (U != null ? U.Id : "");
        var i = $.parseJSON(O.CustomFieldsSchema);
        var ac = "";
        var Z = {
            __metadata: {
                type: "SP.Data.RequestsListItem"
            },
            SchemaInstance: O.CustomFieldsSchema,
            SheetSchemaInstance: O.CustomSheetFieldsSchema,
            ApprovalType: O.ApprovalType,
            ApprovalStatus: "0",
            NumberOfApprovers: "0",
            Statu: RequestStatusEnum.Draft.Value,
            EnableAttachments: O.EnableAttachments,
            CurrentApproverId: "",
            SendEmailOnChange: false,
            FirstDayOfPeriod: F,
            FirstDayOfPeriodDate: F,
            NumberOfDays: String(K),
            Year: String(T),
            EmailTemplateId: String(V),
            ProjectsEnabled: O.ProjectsEnabled,
            TitleEnabled: O.TitleEnabled,
            CategoryEnabled: O.CategoryEnabled,
            NumberOfDecimalPlaces: O.NumberOfDecimalPlaces,
            HideFromDelve: true,
            DateFieldsMode: O.DateFieldsMode
        };
        if (H) {
            Z.RequesterName = $("#ddlUser option:selected").attr("name");
            Z.RequesterId = $("#ddlUser").val()
        } else {
            Z.RequesterName = CurrentUser.Name;
            Z.RequesterId = String(CurrentUser.Id)
        }
        if (SystemSettings.PeriodType == "Weekly") {
            Z.WeekNumber = String(S);
            Z.Period = "Week " + S
        } else {
            if (SystemSettings.PeriodType == "Bi-Weekly") {
                if (S == 53) {
                    Z.Period = "Week " + S;
                    Z.WeekNumber = String(S)
                } else {
                    Z.Period = "Weeks " + String(S) + "-" + String(S + 1);
                    Z.WeekNumber = String(S) + "-" + String(S + 1)
                }
            } else {
                if (SystemSettings.PeriodType == "Monthly") {
                    Z.Period = I
                } else {
                    if (SystemSettings.PeriodType == "Semi-Monthly") {
                        if (E.date() <= 15) {
                            Z.Period = "1-15 " + E.format("MMMM")
                        } else {
                            Z.Period = "16-" + moment(E).endOf("month").date() + " " + E.format("MMMM")
                        }
                    }
                }
            }
        }
        if (SystemSettings.PreventDuplicate == "enabled") {
            var af = (H ? $("#ddlUser").val() : String(CurrentUser.Id));
            var X = null;
            if (SystemSettings.PeriodType == "Weekly" || SystemSettings.PeriodType == "Bi-Weekly") {
                X = RequestFormCreate.getCurrentWeekForCurrentUser(Z.WeekNumber, T, af)
            } else {
                if (SystemSettings.PeriodType == "Monthly" || SystemSettings.PeriodType == "Semi-Monthly") {
                    X = RequestFormCreate.getCurrentMonthForCurrentUser(Z.Period, E.year(), af)
                }
            }
            if (X != null) {
                addMessage("Timesheet for given period already exists!", "error");
                return
            }
        }
        if (O.ApprovalType != "Auto-approved") {
            if (R == null) {
                R = (H ? RequestFormCreate.getUserProfileByUserId($("#ddlUser").val()) : RequestFormCreate.getUserProfileByUserId(CurrentUser.Id))
            }
            if (R == null) {
                addMessage("User profile doesn't exists! (to create user profile go to Administration->User profiles).", "error");
                B = false;
                return false
            }
            if (isEmpty(R.FirstApproverId) == false) {
                var Y = RequestFormCreate.getUserById(R.FirstApproverId);
                Z.FirstApproverEmail = Y.Email;
                Z.FirstApproverId = R.FirstApproverId;
                Z.NumberOfApprovers = "1"
            } else {
                addMessage("Approver is not defined in your user profile.", "error");
                B = false;
                return false
            }
            if (isEmpty(R.SecondApproverId) == false) {
                var ad = RequestFormCreate.getUserById(R.SecondApproverId);
                Z.SecondApproverEmail = ad.Email;
                Z.SecondApproverId = R.SecondApproverId;
                Z.NumberOfApprovers = "2"
            }
        }
        Z.TimeSheetJSON = JSON.stringify($("#divTimeSheet").data("handsontable").getData());
        Z.TotalHours = $("#hdnTotalHours").val();
        if (isEmpty(SystemSettings.MinHours) == false && $.isNumeric(SystemSettings.MinHours) && $.isNumeric($("#hdnTotalHours").val())) {
            var ab = parseFloat(SystemSettings.MinHours);
            var ae = parseFloat($("#hdnTotalHours").val());
            if (ae < ab) {
                addMessage("The minimum number of reported hours is " + ab, "warning");
                B = false;
                return
            }
        }
        if (isEmpty(SystemSettings.MaxHours) == false && $.isNumeric(SystemSettings.MaxHours) && $.isNumeric($("#hdnTotalHours").val())) {
            var aa = parseFloat(SystemSettings.MaxHours);
            var ae = parseFloat($("#hdnTotalHours").val());
            if (ae > aa) {
                addMessage("The maximum number of reported hours is " + aa, "warning");
                B = false;
                return
            }
        }
        if (SystemSettings.BillableHours) {
            Z.BillableHours = true;
            Z.BillableHoursAmount = $("#hdnBillableHours").val()
        }
        if (SystemSettings.BillingAmount) {
            Z.BillingAmount = true;
            Z.BillingAmountTotal = $("#hdnBillingAmountTotal").val();
            if (SystemSettings.HourlyRate == "user") {
                Z.HourlyRate = String(Q)
            }
        }
        $.each(i, function () {
            if (isEmpty(this.FieldName) == false && isEmpty(this.FieldType) == false && isEmpty(this.ColumnName) == false) {
                if (this.FieldType == "Boolean") {
                    Z[this.ColumnName] = $("#" + this.ColumnName).prop("checked") ? "Yes" : "No"
                } else {
                    if (this.FieldType == "Multiple Choice") {
                        Z[this.ColumnName] = $("#" + this.ColumnName).val() != null ? String($("#" + this.ColumnName).val()).trim() : ""
                    } else {
                        if (isEmpty($("#" + this.ColumnName).val()) == false) {
                            Z[this.ColumnName] = $("#" + this.ColumnName).val().StripTags()
                        } else {
                            Z[this.ColumnName] = ""
                        }
                    }
                }
            }
        });
        RequestFormCreate.createRequestForm(Z)
    })
});

