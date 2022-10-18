<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    
   <!-- <SharePoint:ScriptLink name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />-->
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script> 
    <script type="text/javascript" src="/_layouts/15/sp.js"></script> 
    <meta name="WebPartPageExpansion" content="full" />

   <link rel="stylesheet" href="../Content/bundle_without_tables.css" type="text/css" />
    <link rel="stylesheet" href="../Content/css/select2.css" type="text/css" />
    <link rel="stylesheet" href="../Content/select2-bootstrap.css" type="text/css" />
     

    <script src="../Scripts/jquery-1.10.2.js"></script>
    <script src="../Scripts/jquery-ui-1.9.2.min.js"></script>
    <script src="../Scripts/jtable/jquery.jtable.min.js"></script>

    <script type="text/javascript" src="../Scripts/bootstrap.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.validate.min.js"></script>
    <script type="text/javascript" src="../Scripts/chosen.jquery.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.cookie.js"></script>
    <script type="text/javascript" src="../Scripts/modernizr.min.js"></script>
    <script type="text/javascript" src="../Scripts/moment.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.loadTemplate-1.4.4.min.js"></script>
    <script type="text/javascript" src="../Scripts/notify.min.js"></script>
    <script type="text/javascript" src="../Scripts/opentip-jquery.min.js"></script> 
    <script type="text/javascript" src="../Scripts/select2.min.js"></script>  

    <!--Custom script-->
    <script type="text/javascript" src="../Scripts/jquery.validationEngine.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.validationEngine-en.js"></script>
    <link rel="stylesheet" href="../Content/validationEngine-jquery.css" type="text/css" />
    

    <script type="text/javascript" src="../Scripts/Custom/Common.js"></script>   
    <script type="text/javascript" src="../Scripts/Custom/Integrations.js"></script>

    <link rel="stylesheet" href="../Content/styles.css" type="text/css" />

</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<%-- %><asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Timesheet Plus
</asp:Content>--%>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

        <!-- The following content will be replaced with the user name when you run the app - see App.js -->

     <div class="containerWrapper">
      <!--Menu-->
    <div id="containerLeft" class="containerLeft" style="float:left;width:200px;margin-top:10px; "><div id="logoleft" class="mainLogo" style="background-image: url(../Images/logo.png) !important;"><a href="Default.aspx"> </a></div>
          
    <div id="menuleft" class="ui-sortable ui-resizable" style="float: left; line-height: normal;">
        <div class="navigation">
            <div class="navigation-title">
                <a class="toggle-navigation" href="#">
                    <span>My Timesheets</span>
                </a>
            </div>
            <ul class="navigation-menu">
                <li class="dropdown"></li>
                <li>
                    <a href="MyRequests.aspx?status=Draft">Drafts</a>
                </li>
                <li>
                    <a href="MyRequests.aspx?status=Pending Approval">Pending Approval</a>
                </li>
                <li>
                    <a href="MyRequests.aspx?status=Rejected">Rejected</a>
                </li>
                <li>
                    <a href="MyRequests.aspx?status=Approved">Approved</a>
                </li>
            </ul>
        </div>

   
        <div class="navigation" id="manageRequestsPanel" style="">
            <div class="navigation-title">
                <a class="toggle-navigation" href="#">
                    <span>Team Management</span>
                </a>
            </div>
            <ul class="navigation-menu">
                <li class="dropdown"></li>
                <li>
                    <a href="ToApproveByMe.aspx">Timesheets for My Approval</a>
                </li>
                <li>
                    <a href="ReportsRequests.aspx?mode=MyTeam">My Team's Timesheets</a>
                </li>

                <li>
                    <a href="TimesheetSummary.aspx">Timesheets Summary</a>
                </li>

                <li>
                    <a href="SubmissionsReport.aspx?mode=MyTeam">Submissions Report</a>
                </li>

                

                <li>
                    <a href="TimesheetReport.aspx?mode=MyTeam">Total Hours Report</a>
                </li>
                <li id="linkTotalCostsReport" style="display:none;">
                    <a href="TimesheetCostReport.aspx?mode=MyTeam">Total Cost Report</a>
                </li>

                <li>
                    <a href="SubstituteApproversList.aspx?My=true">My Substitute Approver</a>
                </li>
            </ul>
        </div>
        <div class="navigation" id="adminNavPanel" style="">
            <div class="navigation-title">
                <a class="toggle-navigation" href="#">
                    <span>Administration</span>
                </a>
            </div>
            <ul class="navigation-menu">
                <li class="dropdown"></li>
                <li>
                    <a href="Settings.aspx">Settings</a>
                </li>
                <li>
                    <a href="UserRolesList.aspx">User Roles</a>
                </li>
                <li>
                    <a href="UserProfilesList.aspx">User Profiles</a>
                </li>
                <li>
                    <a href="SubstituteApproversList.aspx">Substitute Approvers</a>
                </li>
                <li>
                    <a href="ProjectsList.aspx">Projects</a>
                </li>
                <li>
                    <a href="CategoriesList.aspx">Categories</a>
                </li>
                <li>
                    <a href="EmailTemplates.aspx">Email Templates</a>
                </li>
                <li>
                    <a href="ReportsRequests.aspx?mode=All">All Timesheets</a>
                </li>
                <li>
                    <a href="Integrations.aspx">Integrations</a>
                </li>
                <li>
                    <a href="Licenses.aspx">License</a>
                </li>
                <li>
                    <a href="Help.aspx">Help</a>
                </li>

            </ul>

        </div>

    </div>

</div>


    <!--Main Content-->
    <div id="containerRight" class="containerRight">


        <div id="topHeader" class="topHeader">
            <a href="#" id="menuExpandButton" class="menuExpandButton" data-name="hide" ></a>
            <h1>Integrations</h1>
        </div>

        <div id="mainContainer" style="clear: both;">
            <div class="maincontent">


                    <form id="integrationsForm" class="stdform stdform2" method="post">

                        <div style="margin: 10px;">
                            <button id="btnSubmit" type="submit" class="btn btn-primary" style="display:none;">Create List</button>
                            <button id="btnDelete" type="button" class="btn btn-primary" style="display:none;">Remove List</button>
                            <button id="btnDisable" type="button" class="btn btn-primary" style="display:none;">Disable export</button>
                            <button id="btnEnable" type="button" class="btn btn-primary" style="display:none;">Enable export</button>
                        </div>

                        <div class="blueContainer" style="width:700px;">
                            

                            <p class="control-group" >
                                <label>List Name</label>
                                <span class="field" id="tipListName" >
                                     <input type="text" name="txtListName" id="txtListName" style="width:440px;display:none;"  class="input-xlarge" />
                                    <a href="#" style="display:none;" class="sLabel" id="aLinkURL" target="_blank" ></a>
                                </span>
                            </p>
                            <p class="control-group">
                                <label>Export Conditions</label>
                                <span class="field" id="tipTriggers">
                                     <select id="mchblExportTriggers"  name="mchblExportTriggers" style="width:450px;display:none;"  class="select2" multiple = "multiple"  >
                                    </select>
                                    <span id="lblExportTriggers" class="sLabel" style="width:440px;display:none;"></span>
                                </span>
                            </p>

                            <p class="control-group">
                                <label>Standard Fields To Export</label>
                                <span class="field" id="tipStandardFieldsToExport">
                                     <select id="mchblStandardFieldsToExport"  name="mchblStandardFieldsToExport" style="width:450px;display:none;" class="select2" multiple = "multiple"  >
                                    </select>
                                    <span id="lblStandardFieldsToExport" class="sLabel" style="width:440px;display:none;"></span>
                                </span>
                            </p>

                             <p class="control-group" id="pCustomFieldsToExport" style="display:none;">
                                <label>Custom Fields To Export</label>
                                <span class="field" id="tipCustomFieldsToExport">
                                     <select id="mchblCustomFieldsToExport"  name="mchblCustomFieldsToExport" style="width:450px;display:none;" class="select2" multiple = "multiple"  >
                                    </select>
                                    <span id="lblCustomFieldsToExport" class="sLabel" style="width:440px;display:none;"></span>
                                </span>
                            </p>
                            <p class="control-group" style="display:none" id="pIntegrationStatus" >
                                <label>Integration Status</label>
                                <span class="field" >
                                     <span id="lblEnabled" class="sLabel" style="color:green;display:none;" >Enabled</span>
                                    <span id="lblDisabled" class="sLabel" style="color:red;display:none;" >Disabled</span>
                                </span>
                            </p>
                            <p style="display:none" id="pIsHidden">
                                <label >List is Hidden</label>
                                <span class="field" id="tipIsHidden">
                            	     <input  style="line-height:20px !important;height:20px !important;" type="checkbox" name="chbIsHidden" id="chbIsHidden"  />
                                 </span>
                            </p>


                        </div>

                    </form>

                    <br />

                    When you enable integration module, requests are automatically exported to native SharePoint list, enabling <br />
                    to leverage the full potential of SharePoint. Sharepoint list can be integrated with many systems by using  <br />
                    Microsoft Power Automate, used as data source for Power BI (reporting services)  or displayed on different site via Web Part. <br />

                    <b>Click <a href="#" target="_blank" >here</a> for more information.</b> <br />
                    <br />
                    "Export Conditions" allows to define a set of states for which export event occurs, for example: <br />
                    -selecting "Draft" means: create a new item in the external Sharepoint List when new request is created.<br />
                    -selecting "Approved" means: create a new item in the external Sharepoint List when request has been approved.
                    <br /><br />

                            <img src="../Images/integrations.png" /> <br /><br />
          



            </div>
        </div>

    </div> </div>
    <div id="dialog-confirm-delete" title="Are you sure?" style="display:none;">
        <p>
            Sharepoint list will be deleted. Are you sure?                                                                                         
        </p>
    </div>
           
       

      
  

</asp:Content>
