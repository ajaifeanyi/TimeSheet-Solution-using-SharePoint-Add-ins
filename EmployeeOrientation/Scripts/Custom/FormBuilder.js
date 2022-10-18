"use strict";
var FormBuilder = window.FormBuilder || {};
FormBuilder = function () {
    var d = function (j, i, k) {
        if (k == null) {
            k = ""
        }
        return '<p class="control-group"><label >' + i + '</label><span class="field"><input type="text" id="' + j + '"  name="' + j + '"  class="input-xlarge" value="' + k + '" /></span></p>'
    }
        , h = function (j, i, k) {
            if (k == null) {
                k = ""
            }
            return '<p class="control-group"><label >' + i + '</label><span class="field"><textarea cols="80" rows="3" id="' + j + '" name="' + j + '" class="standardTextArea" >' + k + "</textarea></span></p>"
        }
        , f = function (k, j, m, q) {
            var n;
            var p = q != null ? q.trim() : "";
            for (var l in m) {
                var i = (l != null && m[l] != null ? m[l].trim() : "");
                var o = (i == p ? 'selected = "selected"' : "");
                n += "<option " + o + ' value="' + String(m[l]).trim() + '">' + String(m[l]).trim() + "</option>"
            }
            return '<p class="control-group"><label >' + j + '</label><span class="field"><select id="' + k + '" name="' + k + '"  class="select2" ><option value="">Select...</option>' + n + "</select></span></p>"
        }
        , e = function (k, j, m) {
            var n;
            for (var l in m) {
                var i = (l != null && m[l] != null ? String(m[l]).trim() : "");
                n += '<option value="' + i + '">' + i + "</option>"
            }
            return '<p class="control-group"><label >' + j + '</label><span class="field"><select id="' + k + '" name="' + k + '"  class="select2" multiple = "multiple" >' + n + "</select></span></p>"
        }
        , b = function (j, i, m, l) {
            var k;
            $.each(m, function () {
                var n = (this.Title == l ? 'selected = "selected"' : "");
                k += "<option " + n + ' value="' + this.Title + '">' + this.Title + " (" + this.Email + ")</option>"
            });
            return '<p class="control-group"><label>' + i + '</label><span class="field"><select id="' + j + '"  name="' + j + '" class="select2" ><option value="">Select...</option>' + k + "</select></span></p>"
        }
        , c = function (j, i, m, l) {
            var k;
            $.each(m, function () {
                var n = (this.Id == l ? 'selected = "selected"' : "");
                k += "<option " + n + ' value="' + this.Id + '">' + this.Title + " (" + this.Email + ")</option>"
            });
            return '<p class="control-group"><label>' + i + '</label><span class="field"><select id="' + j + '"  name="' + j + '" class="select2" ><option value="">Select...</option>' + k + "</select></span></p>"
        }
        , a = function (l, k, i) {
            var j = (i == true ? 'checked="checked"' : "");
            return '<p "control-group"><label >' + k + '</label><span class="field"><input type="checkbox" ' + j + ' id="' + l + '"  name="' + l + '" /></span></p>'
        }
        , g = function (j, i, k) {
            if (k == null) {
                k = ""
            }
            return '<p "control-group"><label >' + i + '</label><span class="field"><span id="' + j + '" class="sLabel">' + k + "</span></span></p>"
        };
    return {
        renderInput: d,
        renderTextArea: h,
        renderSelect: f,
        renderMultiSelect: e,
        renderEmployeeSelect: b,
        renderEmployeeSelectExtended: c,
        renderCheckbox: a,
        renderSpan: g
    }
}();
