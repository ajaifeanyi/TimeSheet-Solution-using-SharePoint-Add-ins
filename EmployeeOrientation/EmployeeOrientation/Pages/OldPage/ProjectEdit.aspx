<%@ Page language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:ScriptLink name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    
    <link rel="stylesheet" href="../Content/bundle_without_tables.css" type="text/css" />
    <link rel="stylesheet" href="../Content/css/select2.css" type="text/css" />

    <script src="../Scripts/jquery-1.10.2.js"></script>
    <script src="../Scripts/jquery-ui-1.9.2.min.js"></script>

    <script type="text/javascript" src="../Scripts/bootstrap.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.validate.min.js"></script>

    <script type="text/javascript" src="../Scripts/chosen.jquery.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.cookie.js"></script>
    <script type="text/javascript" src="../Scripts/modernizr.min.js"></script>
    <script type="text/javascript" src="../Scripts/elements.js"></script>
    <script type="text/javascript" src="../Scripts/prettify/prettify.js"></script>
    <script type="text/javascript" src="../Scripts/moment.min.js"></script>

       <script type="text/javascript" src="../Scripts/select2.min.js"></script> 
     
    <script type="text/javascript" src="../Scripts/notify.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.loadTemplate-1.4.4.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.MultiFile.min.js"></script>
    <script type="text/javascript" src="../Scripts/opentip-jquery.min.js"></script>

    <!--Custom script-->
    <script type="text/javascript" src="../Scripts/Custom/Common.js"></script>
    <script type="text/javascript" src="../Scripts/Custom/ProjectEdit.js"></script>

    <link rel="stylesheet" href="../Content/styles.css" type="text/css" />

</asp:Content>

<asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">
    <WebPartPages:WebPartZone runat="server" FrameType="TitleBarOnly" ID="full" Title="loc:full" />
   <!-- <div class="divHeader">
        <div class="divPreviousSite">
            <img src="../Images/leftarrow.png" />
            <a id="previousSiteUrl" href="#" class="previousSiteUrl">Back to the previous site</a>
        </div>
        <div class="divUserInfo"><span class="spanUserInfo" id="userWelcomeMsg"></span></div>
    </div>
    <div class="divHeader divHeaderGray"></div>
    -->
    <div class="containerWrapper">

        <!--Menu-->
        <div id="containerLeft" class="containerLeft"  style="float: left; width: 200px; margin-top: 10px;"></div>

        <!--Main Content-->
        <div id="containerRight" class="containerRight">

            <div id="topHeader" class="topHeader">
                <a href="#" id="menuExpandButton" class="menuExpandButton" data-name="hide" ><img src="../Images/menu-icon.png" /></a>
                <h1 id="h1">Create new project</h1>
            </div>

            <div id="mainContainer" style="clear: both; width:700px;">
                <div class="maincontent">

                    <form id="ProjectEdit" class="stdform stdform2" method="post">


                        <div style="margin: 10px;">
                            <button id="btnSubmit" type="submit" class="btn btn-primary">Save</button>
                            <button id="btnCancel" type="button" class="btn">Cancel</button>
                        </div>

                        <div class="blueContainer">

                            <p class="control-group" >
                                <label>Title</label>
                                <span class="field" >
                                    <input id="txtTitle" type="text" name="txtTitle" class="input-xlarge"  style="width:400px;" />
                                </span>
                            </p>

                            <p class="control-group" >
                                <label>Visibility level</label>
                                <span class="field" id="tipVisibilityLevel">
                                    <input style="line-height:20px !important;height:20px !important;" type="radio" name="rbVisibilityLevel" value=""  /> Everyone &nbsp; &nbsp;
                                    <input style="line-height:20px !important;height:20px !important;" type="radio" name="rbVisibilityLevel" value="private"  /> Selected project members &nbsp; &nbsp;
                                </span>
                            </p> 

                             <p class="control-group" id="pProjectMembers" style="display:none;">
                                <label>Project Members</label>
                                <span class="field" id="tipProjectMembers">
                                    <select id="mchblProjectMembers"  name="mchblProjectMembers" class="select2" multiple="multiple" style="width:400px;"  >
                                    </select>
                                </span>
                            </p>

                             <p>
                                <label >Is Active</label>
                                 <span class="field" >
                            	    <input type="checkbox" name="chbIsActive" id="chbIsActive" checked="checked"/>
                                 </span>
                            </p>
                        </div>

                    </form>
                </div>

            </div>
        </div>

    </div>

</asp:Content>
