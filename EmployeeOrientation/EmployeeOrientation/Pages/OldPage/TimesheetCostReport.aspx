<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
   <!-- <SharePoint:ScriptLink name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />-->
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script> 
    <script type="text/javascript" src="/_layouts/15/sp.js"></script> 
    <meta name="WebPartPageExpansion" content="full" />

    <!-- Add your CSS styles to the following file -->
    <link href="../Content/bundle.css" rel="stylesheet" />
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />

    <!-- Add your JavaScript to the following file -->
    <script type="text/javascript" src="../Scripts/App.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.jtable.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.loadTemplate-1.4.4.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery-ui-1.9.2.min.js"></script>
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
            <h1>Timesheet Cost Report</h1>
        </div>

        <div id="mainContainer" style="clear: both;">

            <div id="getStarted" style="margin-top: 20px;">
                <h2>Get started with Timesheet Plus</h2>

                <div class="tilesContainer">
                    <div class="tileMedium tileCreate" id="divTileCreate">
                        <div class="tileText">Create new </div>
                    </div>
                    <div class="tileMedium tileCreate" id="divTileCreateOnBehalf" style="display:;">
                        <div class="tileText">Create new on behalf of other</div>
                    </div>
                    <div  class="tileMedium tileEdit" id="divEdit" >
                        <div class="tileText" >Edit current</div>
                    </div>

                    <div onclick="window.location.href='ToApproveByMe.aspx'" class="tileMedium tileApprove" style="display:;">
                        <div class="tileText">Approve</div>
                    </div>
                    
                    <div onclick="window.location.href='UserGuide.aspx'" class="tileMedium tileLearn">
                        <div class="tileText">Learn more</div>
                    </div>
                </div>

            </div>


            <div style="width: 795px; margin-top: 25px">
                
                 <div class="jtableContainer" id="TimeSheets">
                     <div class="jtable-main-container">
                         <div class="jtable-busy-panel-background" style="display: none; width: 795px; height: 109px;"></div>
                         <div class="jtable-busy-message" style="display: none;"></div>
                         <div class="jtable-title"><div class="jtable-title-text">My current timesheets</div>
                             <div class="jtable-toolbar"></div>

                         </div>
                         <table class="jtable">
                             <thead>
                                 <tr>
                                     <th class="jtable-column-header jtable-column-header-sortable jtable-column-header-sorted-desc" style="width: 6.80101%;">
                                         <div class="jtable-column-header-container"><span class="jtable-column-header-text">Id</span><div class="jtable-column-resize-handler"></div>
                                         </div>
                                     </th>
                                     <th class="jtable-column-header jtable-column-header-sortable" style="width: 19.8992%;">
                                         <div class="jtable-column-header-container"><span class="jtable-column-header-text">Created</span><div class="jtable-column-resize-handler"></div>
                                         </div>
                                     </th>
                                     <th class="jtable-column-header jtable-column-header-sortable" style="width: 19.8992%;">
                                         <div class="jtable-column-header-container"><span class="jtable-column-header-text">Period</span><div class="jtable-column-resize-handler"></div>
                                         </div>
                                     </th>
                                     <th class="jtable-column-header jtable-column-header-sortable" style="width: 12.9723%;">
                                         <div class="jtable-column-header-container"><span class="jtable-column-header-text">Period Start</span><div class="jtable-column-resize-handler"></div>
                                         </div>
                                     </th>
                                     <th class="jtable-column-header jtable-column-header-sortable" style="width: 13.9798%;">
                                         <div class="jtable-column-header-container"><span class="jtable-column-header-text">Total Hours</span><div class="jtable-column-resize-handler"></div>
                                         </div>
                                     </th>
                                     <th class="jtable-column-header jtable-column-header-sortable" style="width: 25.9446%;">
                                         <div class="jtable-column-header-container"><span class="jtable-column-header-text">Status</span><div class="jtable-column-resize-handler"></div>
                                         </div>
                                     </th>
                                     <th class="jtable-column-header jtable-command-column" style="width: 0.503778%;">
                                         <div class="jtable-column-header-container"><span class="jtable-column-header-text"></span></div>
                                     </th>
                                 </tr>
                             </thead>
                             <tbody>
                                 <tr class="jtable-data-row jtable-row-even" data-record-key="5">
                                     <td>5</td>
                                     <td>2020-06-01</td>
                                     <td>Week 20 2020</td>
                                     <td>2020-05-11</td>
                                     <td>0.0</td>
                                     <td>Draft</td>
                                     <td class="jtable-command-column">
                                         <button title="View" onclick="location.href=&quot;RequestFormView.aspx?requestID=5&quot;" class="jtable-command-button jtable-view-command-button"><span>View</span></button></td>
                                 </tr>
                                 <tr class="jtable-data-row" data-record-key="4">
                                     <td>4</td>
                                     <td>2020-06-01</td>
                                     <td>Week 23 2020</td>
                                     <td>2020-06-01</td>
                                     <td>20.0</td>
                                     <td>Pending Approval</td>
                                     <td class="jtable-command-column">
                                         <button title="View" onclick="location.href=&quot;RequestFormView.aspx?requestID=4&quot;" class="jtable-command-button jtable-view-command-button"><span>View</span></button></td>
                                 </tr>
                                 <tr class="jtable-data-row jtable-row-even" data-record-key="3">
                                     <td>3</td>
                                     <td>2020-06-01</td>
                                     <td>Week 23 2020</td>
                                     <td>2020-06-01</td>
                                     <td>13.0</td>
                                     <td>Pending Approval</td>
                                     <td class="jtable-command-column">
                                         <button title="View" onclick="location.href=&quot;RequestFormView.aspx?requestID=3&quot;" class="jtable-command-button jtable-view-command-button"><span>View</span></button></td>
                                 </tr>
                                 <tr class="jtable-data-row" data-record-key="2">
                                     <td>2</td>
                                     <td>2020-06-01</td>
                                     <td>Week 22 2020</td>
                                     <td>2020-05-25</td>
                                     <td>28.0</td>
                                     <td>Approved</td>
                                     <td class="jtable-command-column">
                                         <button title="View" onclick="location.href=&quot;RequestFormView.aspx?requestID=2&quot;" class="jtable-command-button jtable-view-command-button"><span>View</span></button></td>
                                 </tr>
                                 <tr class="jtable-data-row jtable-row-even" data-record-key="1">
                                     <td>1</td>
                                     <td>2020-06-01</td>
                                     <td>Week 23 2020</td>
                                     <td>2020-06-01</td>
                                     <td>36.0</td>
                                     <td>Rejected</td>
                                     <td class="jtable-command-column">
                                         <button title="View" onclick="location.href=&quot;RequestFormView.aspx?requestID=1&quot;" class="jtable-command-button jtable-view-command-button"><span>View</span></button></td>
                                 </tr>
                             </tbody>
                         </table>
                         <div class="jtable-bottom-panel">
                             <div class="jtable-left-area"><span class="jtable-page-list"><span class="jtable-page-number-first jtable-page-number-disabled">&lt;&lt;</span><span class="jtable-page-number-previous jtable-page-number-disabled">&lt;</span><span class="jtable-page-number jtable-page-number-active jtable-page-number-disabled">1</span><span class="jtable-page-number-next jtable-page-number-disabled">&gt;</span><span class="jtable-page-number-last jtable-page-number-disabled">&gt;&gt;</span></span><span class="jtable-page-size-change" style="display: none;"><span>Row count: </span>
                                 <select>
                                     <option value="10">10</option>
                                     <option value="25">25</option>
                                     <option value="50">50</option>
                                     <option value="100">100</option>
                                     <option value="250">250</option>
                                     <option value="500">500</option>
                                 </select></span></div>
                             <div class="jtable-right-area"><span class="jtable-page-info">Showing 1-5 of 5</span></div>
                         </div>
                         <div class="jtable-column-resize-bar" style="display: none;"></div>
                         <div class="jtable-column-selection-container"></div>
                     </div>
                 </div>
            </div>

        </div>


        </div>
        
    </div>
      
  

</asp:Content>
