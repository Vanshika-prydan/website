import config from '../../../config';

export const emailTemplate = (subject:string, content: string) => `
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject} | We Clean Green</title>
        <style type="text/css">
            * {
                box-sizing: border-box;
                border: none;
                font-family: Omnes;
                text-align: center;
                color: rgba(58,82,103,1);
                letter-spacing: 0.2px;
            }
            html {
            width: 100%;
            height: 100%;
            background-color:  rgba(212,218,210,0.4);
            }
            body{
            }
            a {
                text-decoration: underline;
                color: rgba(58,82,103,1);

            }
            a:hover{
                text-decoration: none;
            }
            a:visited{
                color: rgba(58,82,103,1);
            }
            
            #Image_2 {
                width: 16.222px;
                height: 16.222px;
            }
            #Image_1 {
                width: 17.196px;
                height: 17.196px;
            }
            #Image_3 {
                width: 16.222px;
                height: 16.222px;
            
            }
        </style>
    </head>
    <body>
        <table bgcolor="#ffffff" border="0" width="600" style="margin-right: auto; margin-left: auto; border-radius: 12px;" >
            <tr>
                <td>
                    <div style="width: 600px; background-color: #fff; padding:60px; margin-left: auto; margin-right: auto;">
                        <div style="padding-bottom: 40px;">
                            <img src="https://assets.cleangreen.se/WCG-logo_green.png" alt="We Clean Green"style="width:400px;  display: block; margin-left: auto; margin-right: auto;">
                        </div>
                        <div>
                            ${content}
                        </div>
                        <hr style="border-top: 0.5px solid rgba(163,198,151,1);" >
                        <div style="padding:30px 0;">
                            <div style="flex-direction: row; display: flex; align-items: center; justify-content: center; ">
                                <a href="https://apps.apple.com/us/app/clean-green/id1570473241"><img id="app-store" src="https://assets.cleangreen.se/app-store.png" alt="App store" style="height: 54px;" ></a>
                                <a href="https://play.google.com/store/apps/details?id=se.cleangreen.wecleangreen" ><img id="google-play" src="https://assets.cleangreen.se/google-play.png" alt="Google Play" style="height: 80px;"></a>
                            </div>
                        </div>
                        <div style=" line-height: 20px; font-size: 13px; padding-bottom: 20px;">
                            <span>Ring oss:</span>
                            <span style="font-style:normal;font-weight:bold;"></span>
                            <span style="font-style:normal;font-weight:normal;">${config.PHONE_NUMBER}</span><br>
                            <span>Övrig kontakt:</span>
                            <span style="font-style:normal;font-weight:bold;"></span>
                            <span style="font-style:normal;font-weight:normal;text-decoration:underline;">
                                <a href="mailto:${config.EMAIL}" class="link">${config.EMAIL}</a>
                            </span>
                            <br>
                            <span>Hemsida:</span>
                            <span style="font-style:normal;font-weight:bold;"> </span>
                            <span style="font-style:normal;font-weight:normal;text-decoration:underline;">
                                <a href="${config.WEBSITE}" class="link">cleangreen.se</a>
                            </span>
                        </div>
                        <hr style="border-top: 0.5px solid rgba(163,198,151,1);" >
                        <div style=" font-size: 10px; color: rgba(112,112,112,1); text-decoration: underline; padding: 20px; ">
                            <span></span>
                            <span style="font-size: 10px;">
                                <a href="https://assets.cleangreen.se/privacy-policy.pdf">Intergritetsmeddelande</a>
                                <br>
                            </span>
                            <br>
                            <span style="font-size: 10px;">
                                Copyright © 2021 We Clean Green i Sverige<br>
                                Tomtebogatan 5, 113 39 Stockholm<br><br>Organisationsnummer: 559268-9565
                            </span>
                        </div>
                        <a href="https://www.instagram.com/Wecleangreensweden/">
                            <img id="Image_1" src="https://assets.cleangreen.se/instagram.png">
                        </a>  
                        <a href="https://www.linkedin.com/company/we-clean-green-sweden/about/">
                            <img id="Image_2" src="https://assets.cleangreen.se/linked-in.png">
                        </a>
                        <a href="https://www.facebook.com/wecleangreensweden">
                            <img id="Image_3" src="https://assets.cleangreen.se/facebook.png" >
                        </a>    
                    </div>
                </td>
            </tr>
        </table>
    </body>
</html>
`
;
