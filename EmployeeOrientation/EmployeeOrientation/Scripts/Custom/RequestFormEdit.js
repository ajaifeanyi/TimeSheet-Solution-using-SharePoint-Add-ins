"use strict";
var RequestFormEdit = window.RequestFormEdit || {};
RequestFormEdit = function () {
    var j = function () {
        var r = "";
        $.ajax({
            url: appweburl + "/_api/contextinfo",
            method: "POST",
            async: false,
            headers: {
                Accept: "application/json; odata=verbose"
            },
            cache: false,
            success: function (s) {
                r = s.d.GetContextWebInformation.FormDigestValue
            },
            error: function (s, t, u) {
                alert(u)
            }
        });
        return r
    }
        , e = function () {
            var r;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/Projects?$select=Id,Title,IsActive1,ProjectMembersIDs,VisibilityLevel&$filter=IsActive1&$orderby=Title asc",
                type: "GET",
                async: false,
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                success: function (s) {
                    r = s.d.results
                },
                error: function () {
                    alert(thrownError)
                }
            });
            return r
        }
        , d = function () {
            var r;
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('Categories')/items?$select=Id,Title,IsActive1&$filter=IsActive1 eq 1&$orderBy=Title asc&$top=1000",
                type: "GET",
                async: false,
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                success: function (s) {
                    r = s.d.results
                },
                error: function () {
                    alert(thrownError)
                }
            });
            return r
        }
        , l = function () {
            var r;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/Settings?$select=Id,Title,AppCategory,ApproversIDs,NumberOfApprovers,EnableAttachments,CustomFieldsSchema",
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
        , g = function () {
            var r;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/CustomUserRoles/?&$select=Id,RoleName,User&$expand=User&$filter=RoleName eq 'Manager'",
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                async: false,
                cache: false,
                success: function (s) {
                    r = s.d.results
                }
            });
            return r
        }
        , n = function (r, s) {
            var u = "";
            if (r != null) {
                for (var t = 0; t < r.length; t++) {
                    if (isEmpty(r[t]) == false) {
                        u += s + " eq " + r[t] + " "
                    }
                    if (t < r.length - 1 && isEmpty(r[t + 1]) == false) {
                        u += " or "
                    }
                }
            }
            return u
        }
        , i = function (t) {
            var s = n(t, "Id");
            var r;
            $.ajax({
                url: appweburl + "/_api/web/siteusers?$filter=" + s,
                contentType: "application/json; odata=verbose",
                async: false,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                cache: false,
                success: function (u) {
                    r = u.d.results
                },
                error: function (w, u, v) {
                    alert(v)
                }
            });
            return r
        }
        , h = function () {
            var r;
            $.ajax({
                url: appweburl + "/_api/web/siteusers?$filter=Email ne '' and substringof('SPOCrawler',Email) eq false and PrincipalType eq 1 and substringof('SPOCrawler',LoginName) eq false and substringof('SharePoint',Title) eq false and substringof('_SPO',Title) eq false and substringof('spocrwl',LoginName) eq false",
                contentType: "application/json; odata=verbose",
                async: false,
                cache: false,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                success: function (s) {
                    r = s.d.results
                },
                error: function (u, s, t) {
                    alert(t)
                }
            });
            return r
        }
        , k = function (t) {
            var u;
            var r = ",";
            for (var s = 1; s < 31; s++) {
                r += "CustomField" + s + (s < 30 ? "," : "")
            }
            var v = "$select=ID,RequesterName,RequesterId,Author/Id,Author/Title,FirstApprover/Title,SecondApprover/Title,FirstApprover/Id,SecondApprover/Id,Title,Statu,SchemaInstance,NumberOfApprovers,ApprovalStatus,EnableAttachments,CurrentApproverId,RejectReason,TimeSheetJSON,FirstApprover,SecondApprover,SheetSchemaInstance,TotalHours,WeekNumber,Year,FirstDayOfPeriod,NumberOfDays,Period,ProjectsEnabled,TitleEnabled,CategoryEnabled,NumberOfDecimalPlaces,BillableHours,BillingAmount,HourlyRate,BillableHoursAmount,BillingAmountTotal,DateFieldsMode" + r;
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('Requests')/items?" + v + "&$expand=Author/Id,Author/Title,Author/Id,FirstApprover/Id,SecondApprover/Id&$filter=ID eq " + t,
                type: "GET",
                async: false,
                cache: false,
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                success: function (w) {
                    u = w.d.results[0]
                },
                error: function (y, w, x) {
                    alert(x)
                }
            });
            return u
        }
        , p = function (s, t) {
            var r = j();
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('Requests')/getItemByStringId('" + s + "')",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "POST",
                data: JSON.stringify(t),
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": r,
                    "X-Http-Method": "PATCH",
                    "IF-MATCH": "*"
                },
                success: function (u) {
                    if ($("input[type=file]").length > 1) {
                        $(".containerWrapper").loading({
                            theme: "light",
                            start: true,
                            message: "Uploading file..."
                        })
                    }
                    o(s);
                    if ($("input[type=file]").length > 1) {
                        setTimeout(function () {
                            location.href = "RequestFormView.html?requestID=" + s
                        }, 500)
                    } else {
                        location.href = "RequestFormView.html?requestID=" + s
                    }
                },
                error: function (w, u, v) {
                    alert(v)
                }
            })
        }
        , f = function (s) {
            var r;
            $.ajax({
                url: appweburl + "/_api/Web/lists/getByTitle('Requests')/items?$select=Attachments,AttachmentFiles&$expand=AttachmentFiles&$filter=Id eq " + s,
                contentType: "application/json; odata=verbose",
                async: false,
                cache: false,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                success: function (t) {
                    r = t.d.results[0].AttachmentFiles.results
                },
                error: function (v, t, u) {
                    alert(u)
                }
            });
            return r
        }
        , c = function (r, s, u) {
            var t = j();
            $.ajax({
                url: appweburl + "/_api/lists/getByTitle('Requests')/getItemById(" + u + ")/AttachmentFiles/getByFileName('" + s + "')",
                method: "DELETE",
                async: false,
                cache: false,
                headers: {
                    "X-RequestDigest": t
                },
                success: function (v) {
                    $("#" + r).remove()
                },
                error: function (x, v, w) {
                    alert(w)
                }
            })
        }
        , b = function (v) {
            var t = ";base64,";
            var u = v.indexOf(t) + t.length;
            var s = v.substring(u);
            var x = window.atob(s);
            var y = x.length;
            var r = new Uint8Array(new ArrayBuffer(y));
            for (var w = 0; w < y; w++) {
                r[w] = x.charCodeAt(w)
            }
            return r
        }
        , o = function (r) {
            if ($("input[type=file]").length > 1 && !window.FileReader) {
                alert("You cannot upload file because HTML5 FileSystem APIs are not fully supported in this browser.")
            }
            $("input[type=file]").each(function () {
                var t = $(this).prop("files");
                var s = t[0];
                if (s) {
                    var u = new FileReader();
                    u.onload = function (v) {
                        q(r, s.name, v.target.result)
                    }
                        ;
                    u.readAsDataURL(s)
                }
            })
        }
        , q = function (u, s, r) {
            var t = j();
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('Requests')/items(" + u + ")/AttachmentFiles/add(FileName='" + s + "')",
                type: "POST",
                async: false,
                processData: false,
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": t
                },
                data: b(r),
                error: function (x, v, w) { }
            })
        }
        , a = function (t, s) {
            var r;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/Settings?$select=Id&$filter=substringof('," + t + ",',ManagersIDs) and Id eq " + s,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                async: false,
                success: function (u) {
                    r = u.d.results
                },
                error: function (w, u, v) {
                    alert(v)
                }
            });
            return r
        }
        , m = function (r, t, u, v, x, s, w) {
            if (u) {
                return true
            }
            if (x == RequestStatusEnum.PendingApproval.Value) {
                if ((isEmpty(SystemSettings.EditingPendingApproval) || SystemSettings.EditingPendingApproval == "requester") && (r == t || w == t)) {
                    return true
                }
                if (SystemSettings.EditingPendingApproval == "manager" && v) {
                    return true
                }
            } else {
                if (x == RequestStatusEnum.Approved.Value) {
                    if (SystemSettings.EditingApproved == "requester" && (r == t || w == t)) {
                        return true
                    }
                    if (SystemSettings.EditingApproved == "manager" && v) {
                        return true
                    }
                } else {
                    if (x == RequestStatusEnum.Draft.Value || x == RequestStatusEnum.Rejected.Value) {
                        if (r == t || w == t) {
                            return true
                        }
                    }
                }
            }
            return false
        };
    return {
        getAllUsers: h,
        getActiveProjects: e,
        getActiveCategories: d,
        getRequestTemplate: l,
        getAllManagers: g,
        getFilteredUsers: i,
        getRequestForm: k,
        updateRequestForm: p,
        getAllAttachments: f,
        deleteAttachment: c,
        hasAccessToRequest: m
    }
}();
$(document).ready(function () {
    $(".containerWrapper").width(2300);
    var L = getQueryStringParameter("requestID");
    if (typeof L == "undefined" || $.isNumeric(L) == false) {
        location.href = "NotFound.aspx";
        return
    }
    $("#btnCancel").click(function () {
        location.href = "RequestFormView.html?requestID=" + L
    });
    var K = RequestFormEdit.getRequestForm(L);
    if (isEmpty(K.NumberOfDecimalPlaces)) {
        K.NumberOfDecimalPlaces = "0.0"
    }
    var A;
    if (K.NumberOfDecimalPlaces == "0") {
        A = 0
    } else {
        if (K.NumberOfDecimalPlaces == "0.0") {
            A = 1
        } else {
            if (K.NumberOfDecimalPlaces == "0.00") {
                A = 2
            }
        }
    }
    if (K == null) {
        location.href = "NotFound.aspx";
        return
    }
    if (RequestFormEdit.hasAccessToRequest(K.Author.Id, CurrentUser.Id, CurrentUser.IsAdmin, CurrentUser.IsManager, K.Statu, K.CurrentApproverId, K.RequesterId) == false) {
        location.href = "AccessDenied.aspx";
        return
    }
    jQuery("#requestFormEdit").validate({
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
    var H = parseInt(K.NumberOfApprovers);
    var d = H == 1 ? ["Approver"] : ["1st Approver", "2nd Approver"];
    var c = ["FirstApprover", "SecondApprover"];
    var I = parseInt(K.NumberOfDays);
    var M = RequestFormEdit.getRequestTemplate();
    var U;
    if (M != null && isEmpty(M.ApproversIDs) == false) {
        var O = String(M.ApproversIDs).split(",");
        U = RequestFormEdit.getFilteredUsers(O)
    } else {
        U = RequestFormEdit.getAllUsers()
    }
    var N = $.parseJSON(K.SchemaInstance);
    $.each(N, function () {
        if (isEmpty(this.FieldName) == false && isEmpty(this.FieldType) == false && isEmpty(this.ColumnName) == false) {
            if (this.FieldType == "Single Line of Text") {
                $("#aRequestDetails").append(FormBuilder.renderInput(this.ColumnName, this.FieldName, K[this.ColumnName]));
                if (this.Required == "true") {
                    $("#" + this.ColumnName).rules("add", {
                        required: true
                    })
                }
            } else {
                if (this.FieldType == "Multiple Line of Text") {
                    $("#aRequestDetails").append(FormBuilder.renderTextArea(this.ColumnName, this.FieldName, K[this.ColumnName]))
                } else {
                    if (this.FieldType == "Number" || this.FieldType == "Currency") {
                        $("#aRequestDetails").append(FormBuilder.renderInput(this.ColumnName, this.FieldName, K[this.ColumnName]));
                        $("#" + this.ColumnName).rules("add", {
                            maxlength: 250,
                            number: true
                        })
                    } else {
                        if (this.FieldType == "Boolean") {
                            $("#aRequestDetails").append(FormBuilder.renderCheckbox(this.ColumnName, this.FieldName, K[this.ColumnName] == "Yes" ? true : false))
                        } else {
                            if (this.FieldType == "Choice") {
                                if (this.Options != null) {
                                    this.Options = this.Options.replace('"', "");
                                    var V = this.Options.split(",");
                                    $("#aRequestDetails").append(FormBuilder.renderSelect(this.ColumnName, this.FieldName, V, K[this.ColumnName]))
                                }
                            } else {
                                if (this.FieldType == "Multiple Choice") {
                                    if (this.Options != null) {
                                        this.Options = this.Options.replace('"', "");
                                        var V = this.Options.split(",");
                                        $("#aRequestDetails").append(FormBuilder.renderMultiSelect(this.ColumnName, this.FieldName, V));
                                        if (isEmpty(K[this.ColumnName]) == false) {
                                            var W = String(K[this.ColumnName]).split(",");
                                            $("#" + this.ColumnName).val(W)
                                        }
                                    }
                                } else {
                                    if (this.FieldType == "User") {
                                        var i = RequestFormEdit.getAllUsers();
                                        $("#aRequestDetails").append(FormBuilder.renderEmployeeSelect(this.ColumnName, this.FieldName, i, K[this.ColumnName]))
                                    } else {
                                        if (this.FieldType == "Date") {
                                            $("#aRequestDetails").append(FormBuilder.renderInput(this.ColumnName, this.FieldName, K[this.ColumnName]));
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
            if (this.Required == "true") {
                $("#" + this.ColumnName).rules("add", {
                    required: true
                })
            }
        }
    });
    var E = moment(K.FirstDayOfPeriod);
    $(".select2").select2();
    $.datepicker.setDefaults({
        dateFormat: commonDateFormat,
        showButtonPanel: false,
        changeMonth: false,
        changeYear: false,
        defaultDate: moment(E).toDate(),
        firstDay: (SystemSettings.WeekNumbering == "Sunday" ? 0 : 1)
    });
    if (K.EnableAttachments) {
        $(function () {
            $("#fileUpload").MultiFile({
                max: 10,
                STRING: {
                    remove: "Delete"
                }
            })
        });
        var k = RequestFormEdit.getAllAttachments(L);
        var g = $("#fileUpload_wrap_list");
        var j = 0;
        var h;
        $.each(k, function () {
            j++;
            h = "MultiFilelabel" + j;
            g.append('<div class="MultiFile-label"  id="' + h + '"  ><a class="MultiFile-remove" onclick="RequestFormEdit.deleteAttachment(\'' + h + "','" + this.FileName + "'," + L + ');"  href="#fileUpload_wrap">Delete </a><span class="MultiFile-title">' + this.FileName + "</span></div>")
        })
    } else {
        $("#liAttachments").hide();
        $("#aAttachments").hide()
    }
    $("#lblRequesterName").text(K.RequesterName);
    $("#hdnTotalHours").val(K.TotalHours);
    $("#lblTotalHours").text(SystemSettings.PeriodType + " hours total: " + numeral(K.TotalHours).format("0," + K.NumberOfDecimalPlaces));
    var T = 0;
    K.BillableHours = K.BillableHours == null ? false : K.BillableHours;
    K.BillingAmount = K.BillingAmount == null ? false : K.BillingAmount;
    if (K.BillableHours) {
        $("#lblBillableHours").show();
        $("#lblBillableHours").text("Billable hours: " + numeral(K.BillableHoursAmount).format("0," + K.NumberOfDecimalPlaces))
    }
    if (K.BillingAmount) {
        $("#lblBillingAmountTotal").show();
        $("#lblBillingAmountTotal").text("Total billing amount: " + numeral(K.BillingAmountTotal).format("0," + K.NumberOfDecimalPlaces) + " " + SystemSettings.CurrencySymbol)
    }
    var G = (isEmpty(K.HourlyRate) == false);
    if (G) {
        T = parseFloat(K.HourlyRate)
    }
    $("#lblPeriod").text(K.Period + " " + K.Year);
    var a = function (W, Y) {
        var ad = 0;
        var ac = {};
        if (SystemSettings.DailyTotals == "enabled") {
            for (var X = 1; X < I + 1; X++) {
                ac[X] = 0
            }
        }
        var V = 0;
        var ab = 0;
        var Z = $("#divTimeSheet").data("handsontable");
        var aa = Z.getData();
        $.each(aa, function () {
            if ($.isNumeric(this.Total)) {
                ad += parseFloat(this.Total)
            }
            if (SystemSettings.DailyTotals == "enabled") {
                for (var ae = 1; ae < I + 1; ae++) {
                    if (this[ae] != null && $.isNumeric(this[ae])) {
                        ac[ae] += parseFloat(this[ae])
                    }
                }
            }
            if (SystemSettings.BillableHours && $.isNumeric(this.Total) && this.Billable == "Yes") {
                V += parseFloat(this.Total)
            }
            if (SystemSettings.BillingAmount && $.isNumeric(this.Amount)) {
                ab += (parseFloat(this.Amount))
            }
        });
        if (SystemSettings.DailyTotals == "enabled") {
            for (var X = 1; X < I + 1; X++) {
                if (ac[X] != null && $.isNumeric(ac[X])) {
                    $("#td" + X).html(ac[X].toFixed(A))
                }
            }
        }
        $("#lblTotalHours").text(SystemSettings.PeriodType + " hours total: " + numeral(ad).format("0," + K.NumberOfDecimalPlaces));
        $("#hdnTotalHours").val(numeral(ad).format("0," + K.NumberOfDecimalPlaces));
        if (SystemSettings.BillableHours) {
            $("#lblBillableHours").text("Billable hours: " + numeral(V).format("0," + K.NumberOfDecimalPlaces));
            $("#hdnBillableHours").val(numeral(V).format("0," + K.NumberOfDecimalPlaces))
        }
        if (SystemSettings.BillingAmount) {
            $("#lblBillingAmountTotal").text("Total billing amount: " + numeral(ab).format("0," + K.NumberOfDecimalPlaces) + " " + SystemSettings.CurrencySymbol);
            $("#hdnBillingAmountTotal").val(numeral(ab).format("0," + K.NumberOfDecimalPlaces))
        }
    };
    var b = function (W, ag) {
        var an = 0;
        var ak = 0;
        var am = {};
        if (SystemSettings.DailyTotals == "enabled") {
            for (var aa = 1; aa < I + 1; aa++) {
                am[aa] = 0
            }
        }
        var V = 0;
        var aj = 0;
        var ah = $("#divTimeSheet").data("handsontable");
        var ai = ah.getData();
        $.each(ai, function () {
            if ($.isNumeric(this.Total)) {
                an += parseFloat(this.Total)
            }
            if (SystemSettings.DailyTotals == "enabled") {
                for (var ao = 1; ao < I + 1; ao++) {
                    if (this[ao] != null && $.isNumeric(this[ao])) {
                        am[ao] += parseFloat(this[ao])
                    }
                }
            }
            if (K.BillableHours && $.isNumeric(this.Total) && this.Billable == "Yes") {
                V += parseFloat(this.Total)
            }
            if (K.BillingAmount && $.isNumeric(this.Amount)) {
                aj += (parseFloat(this.Amount))
            }
        });
        if (SystemSettings.DailyTotals == "enabled") {
            for (var aa = 1; aa < I + 1; aa++) {
                if (am[aa] != null && $.isNumeric(am[aa])) {
                    $("#td" + aa).html(am[aa].toFixed(A))
                }
            }
        }
        $("#lblTotalHours").text(SystemSettings.PeriodType + " hours total: " + numeral(an).format("0," + K.NumberOfDecimalPlaces));
        $("#hdnTotalHours").val(numeral(an).format("0," + K.NumberOfDecimalPlaces));
        if (K.BillableHours) {
            $("#lblBillableHours").text("Billable hours: " + numeral(V).format("0," + K.NumberOfDecimalPlaces));
            $("#hdnBillableHours").val(numeral(V).format("0," + K.NumberOfDecimalPlaces))
        }
        if (K.BillingAmount) {
            $("#lblBillingAmountTotal").text("Total billing amount: " + numeral(aj).format("0," + K.NumberOfDecimalPlaces) + " " + SystemSettings.CurrencySymbol);
            $("#hdnBillingAmountTotal").val(numeral(aj).format("0," + K.NumberOfDecimalPlaces))
        }
        if (W != null) {
            var X = W[0][1];
            if (X == "Total" || X == "Amount") {
                return false
            }
            if (G && X == "Rate") {
                return false
            }
            var ad = W[0][0];
            if (SystemSettings.DateFieldsMode != "ondemand") {
                for (var aa = J + x; aa < J + z + x; aa++) {
                    var Y = $("#divTimeSheet").handsontable("getDataAtCell", ad, aa);
                    if (Y != null && Y != "") {
                        ak += parseFloat(Y)
                    }
                }
                $("#divTimeSheet").handsontable("setDataAtCell", ad, J + z + x, ak.toFixed(A))
            } else {
                var al = $("#divTimeSheet").handsontable("getDataAtCell", ad, J + z + x);
                if (al != null) {
                    ak = parseFloat(al)
                }
            }
            var ab = true;
            if (K.BillableHours) {
                var ae = J == 0 ? J : J - 1;
                var ac = $("#divTimeSheet").handsontable("getDataAtCell", ad, ae);
                if (ac == null || ac == "No") {
                    ab = false
                }
            }
            if (K.BillingAmount) {
                var af = J + z + x + 1;
                var Z = $("#divTimeSheet").handsontable("getDataAtCell", ad, af);
                if (ab && G) {
                    $("#divTimeSheet").handsontable("setDataAtCell", ad, J + z + x + 2, (ak * T).toFixed(A));
                    $("#divTimeSheet").handsontable("setDataAtCell", ad, af, T)
                } else {
                    if (ab && Z != null) {
                        $("#divTimeSheet").handsontable("setDataAtCell", ad, J + z + x + 2, (ak * Z).toFixed(A))
                    }
                }
                if (ab == false) {
                    $("#divTimeSheet").handsontable("setDataAtCell", ad, J + z + x + 2, "")
                }
            }
        }
    };
    var P = [];
    var D = [];
    var J = 0;
    var t = 0;
    var v = 2430;
    if (parseInt(K.NumberOfDays) >= 1) {
        v = 1480
    }
    if (parseInt(K.NumberOfDays) >= 14) {
        v = 1780
    }
    if (parseInt(K.NumberOfDays) >= 25) {
        v = 2430
    }
    if (K.ProjectsEnabled != "false") {
        var f = new Array();
        var C = RequestFormEdit.getActiveProjects();
        $.each(C, function () {
            if (isEmpty(this.VisibilityLevel) || (isEmpty(this.ProjectMembersIDs) == false && this.ProjectMembersIDs.indexOf("," + CurrentUser.Id + ",") !== -1)) {
                f.push(this.Title)
            }
        });
        var p = new Object();
        p.data = "Project";
        p.title = "Project";
        p.width = 250;
        p.editor = "select";
        p.selectOptions = f;
        D.push(p);
        J++;
        t += 250
    }
    if (K.TitleEnabled != "false") {
        var r = new Object();
        r.data = "Title";
        r.title = "Task Title";
        r.width = 350;
        D.push(r);
        J++;
        t += 350
    }
    if (K.CategoryEnabled != "false") {
        var e = new Array();
        var B = RequestFormEdit.getActiveCategories();
        $.each(B, function () {
            e.push(this.Title)
        });
        var n = new Object();
        n.data = "Category";
        n.title = "Category";
        n.width = 250;
        n.editor = "select";
        n.selectOptions = e;
        D.push(n);
        J++;
        t += 250
    }
    if (K.BillableHours) {
        var m = new Object();
        m.data = "Billable";
        m.title = "Billable?";
        m.width = 70;
        m.editor = "select";
        m.selectOptions = ["Yes", "No"];
        D.push(m);
        J++;
        t += 70;
        v += 100
    }
    var z = parseInt(K.NumberOfDays);
    if (K.DateFieldsMode == "ondemand") {
        var o = new Object();
        o.data = "Date";
        o.title = "Date";
        o.width = 100;
        o.type = "date";
        o.showButtonPanel = false;
        o.changeMonth = false;
        o.changeYear = false;
        o.minDate = moment(E).add("d", -1).toDate();
        o.maxDate = moment(E).add("d", z).toDate();
        D.push(o);
        z = 1
    }
    var y = $.parseJSON(K.SheetSchemaInstance);
    var w = new Object();
    var x = 0;
    $.each(y, function () {
        if (isEmpty(this.FieldName) == false && isEmpty(this.FieldType) == false) {
            var i = new Object();
            i.data = this.FieldName;
            i.title = this.FieldName;
            i.width = (isEmpty(this.Width) ? 200 : Math.round(parseFloat(this.Width)));
            t += (isEmpty(this.Width) ? 200 : Math.round(parseFloat(this.Width)));
            v += i.width;
            if (this.FieldType == "Text") {
                i.type = "text";
                w[this.VariableName] = ""
            } else {
                if (this.FieldType == "Number") {
                    i.type = "numeric";
                    i.format = "0," + K.NumberOfDecimalPlaces;
                    i.language = "en";
                    i.allowInvalid = false;
                    w[this.VariableName] = ""
                } else {
                    if (this.FieldType == "Boolean") {
                        i.type = "checkbox";
                        i.checkedTemplate = "Yes";
                        i.uncheckedTemplate = "No";
                        i.className = "handsonTableCheckbox";
                        w[this.VariableName] = "No"
                    } else {
                        if (this.FieldType == "Choice") {
                            if (this.Options != null) {
                                i.editor = "select";
                                var Y = [];
                                var X = this.Options.split(",");
                                for (var W in X) {
                                    var V = (W != null && X[W] != null ? X[W].trim() : "");
                                    if (V != "") {
                                        Y.push(V)
                                    }
                                }
                                i.selectOptions = X
                            }
                            w[this.VariableName] = ""
                        } else {
                            if (this.FieldType == "Date") {
                                i.type = "date";
                                i.showButtonPanel = false;
                                i.changeMonth = false;
                                i.changeYear = false;
                                w[this.VariableName] = ""
                            }
                        }
                    }
                }
            }
            D.push(i);
            x++
        }
    });
    if (SystemSettings.DateFieldsMode != "ondemand" && SystemSettings.DailyTotals == "enabled") {
        $("#trDaysSummary").append('<td style="width:' + t + 'px;" ></td>');
        $("#tDaysSummary").show()
    }
    if (K.DateFieldsMode != "ondemand") {
        for (var F = 1; F < parseInt(K.NumberOfDays) + 1; F++) {
            var u = new Object();
            u.data = String(F);
            u.title = E.format("ddd") + "<br/>" + E.format("D/MM");
            u.width = 40;
            u.type = "numeric";
            u.allowInvalid = false;
            u.format = K.NumberOfDecimalPlaces,
                D.push(u);
            E.add("d", 1);
            if (SystemSettings.DailyTotals == "enabled") {
                $("#trDaysSummary").append('<td class="totalSumPerDay" id="td' + String(F) + '" >0</td>')
            }
        }
    }
    var s = new Object();
    s.data = "Total";
    s.title = "Total<br/>hours";
    s.width = 50;
    if (K.DateFieldsMode == "ondemand") {
        s.allowInvalid = false;
        s.type = "numeric";
        s.format = K.NumberOfDecimalPlaces;
        s.title = "Total hours";
        s.width = 80
    }
    s.readOnly = (K.DateFieldsMode != "ondemand");
    D.push(s);
    if (K.BillingAmount) {
        var q = new Object();
        q.data = "Rate";
        q.title = "Hourly<br/>rate";
        q.width = 60;
        q.readOnly = (G);
        q.type = "numeric";
        q.format = "0," + K.NumberOfDecimalPlaces;
        q.language = "en";
        q.allowInvalid = false;
        D.push(q);
        var l = new Object();
        l.data = "Amount";
        l.title = "Billing<br/>amount";
        l.width = 60;
        l.type = "numeric";
        l.format = "0," + K.NumberOfDecimalPlaces;
        l.language = "en";
        l.allowInvalid = false;
        l.readOnly = true;
        D.push(l);
        v = v + 250
    }
    $(".containerWrapper").width(v);
    $("#divTimeSheet").handsontable({
        data: $.parseJSON(K.TimeSheetJSON),
        minSpareRows: 1,
        afterRemoveRow: a,
        afterChange: b,
        startRows: 1,
        className: "htCenter",
        multiSelect: false,
        contextMenu: ["row_above", "row_below", "remove_row"],
        columns: D
    });
    if (SystemSettings.DailyTotals == "enabled") {
        var Q = $("#divTimeSheet").data("handsontable");
        var R = Q.getData();
        I = parseInt(K.NumberOfDays);
        var S = {};
        for (var F = 1; F < I + 1; F++) {
            S[F] = 0
        }
        $.each(R, function () {
            for (var V = 1; V < I + 1; V++) {
                if (this[V] != null && isEmpty(this[V]) == false && $.isNumeric(this[V])) {
                    S[V] += parseFloat(this[V])
                }
            }
        });
        for (var F = 1; F < I + 1; F++) {
            $("#td" + F).html(S[F].toFixed(A))
        }
    }
    $("#requestFormEdit").submit(function (V) {
        if ($("#requestFormEdit").valid() == false) {
            $("#formTabs").tabs("select", "#aRequestDetails");
            return
        }
        V.preventDefault();
        var X = {
            __metadata: {
                type: "SP.Data.RequestsListItem"
            },
            SendEmailOnChange: false
        };
        for (var W = 0; W < H; W++) {
            X[c[W] + "Id"] = $("#" + c[W]).val()
        }
        X.TimeSheetJSON = JSON.stringify($("#divTimeSheet").data("handsontable").getData());
        X.TotalHours = $("#hdnTotalHours").val();
        X.TimeSheetJSON = JSON.stringify($("#divTimeSheet").data("handsontable").getData());
        X.TotalHours = $("#hdnTotalHours").val();
        if (K.FirstDayOfPeriod == "2018-12-31" && K.Year == "2018") {
            X.Year = "2019"
        }
        if (isEmpty(SystemSettings.MinHours) == false && $.isNumeric(SystemSettings.MinHours) && $.isNumeric($("#hdnTotalHours").val())) {
            var Z = parseFloat(SystemSettings.MinHours);
            var aa = parseFloat($("#hdnTotalHours").val());
            if (aa < Z) {
                addMessage("The minimum number of reported hours is " + Z, "warning");
                return
            }
        }
        if (isEmpty(SystemSettings.MaxHours) == false && $.isNumeric(SystemSettings.MaxHours) && $.isNumeric($("#hdnTotalHours").val())) {
            var Y = parseFloat(SystemSettings.MaxHours);
            var aa = parseFloat($("#hdnTotalHours").val());
            if (aa > Y) {
                addMessage("The maximum number of reported hours is " + Y, "warning");
                return
            }
        }
        if (SystemSettings.BillableHours) {
            X.BillableHoursAmount = $("#hdnBillableHours").val()
        }
        if (SystemSettings.BillingAmount) {
            X.BillingAmountTotal = $("#hdnBillingAmountTotal").val()
        }
        $.each(N, function () {
            if (isEmpty(this.FieldName) == false && isEmpty(this.FieldType) == false && isEmpty(this.ColumnName) == false) {
                if (this.FieldType == "Boolean") {
                    X[this.ColumnName] = $("#" + this.ColumnName).prop("checked") ? "Yes" : "No"
                } else {
                    if (this.FieldType == "Multiple Choice") {
                        X[this.ColumnName] = $("#" + this.ColumnName).val() != null ? String($("#" + this.ColumnName).val()).trim() : ""
                    } else {
                        if (isEmpty($("#" + this.ColumnName).val()) == false) {
                            X[this.ColumnName] = $("#" + this.ColumnName).val().StripTags()
                        } else {
                            X[this.ColumnName] = ""
                        }
                    }
                }
            }
        });
        RequestFormEdit.updateRequestForm(L, X)
    })
});
