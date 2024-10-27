import Head from "next/head"


import { LegalBold, LegalHeading, LegalInfo, LegalLink, LegalSubheading } from "@/components/legal/components"
import MainHeader, { NewHeader } from "@/components/main/header"

export default function PrivacyPage() {
    return (
        <>
            <Head>
                <title>Privacy Policy - Wardrobe</title>
            </Head>
            <main className="min-h-screen bg-oblack">
                <NewHeader />
                <div className="flex flex-col gap-2 items-center p-4 lg:p-10 text-center">
                    <h1 className="font-extrabold text-5xl text-zinc-100 whitespace-nowrap"><span className="hidden lg:block">Read Our</span> <span className="text-custom-bpink font-mc drop-shadow-ciwhite">Privacy Policy</span></h1>
                    <p class="italic text-zinc-500 mb-16">Last Updated: 20/04/2024 (DD/MM/YYYY)</p>
                    <div className="text-left">
                        <section class="flex align-center justify-evenly gap-8 text-white">
                        <div class="w-7/12 flex flex-col gap-4">
                            This privacy notice for Wardrobe.gg (doing business as Wardrobe) (&apos;Wardrobe&apos;, &apos;we&apos;, &apos;us&apos;, or &apos;our&apos;), describes how and why we might collect, store, use, and/or share (&apos;process&apos;) your information when you use our services (&apos;Services&apos;), such as when you:
                            <ul>
                                <li> - Visit our website at <LegalLink to='https://wardrobe.gg'>https://wardrobe.gg</LegalLink>, or any website of ours that links to this privacy notice</li>
                                <li> - Engage with us in other related ways, including any sales, marketing, or events</li>
                            </ul>
                            <LegalBold>Questions or concerns?</LegalBold> Reading this privacy notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at legal@wardrobe.gg.
                        
                            <LegalHeading>Summary of key points</LegalHeading>
                            <i>This summary provides key points from our privacy notice.</i>
                            <span>
                                <LegalBold>What personal information do we process?</LegalBold> <span>When you visit, use, or navigate our Services, we may process personal information depending on how you interact with Wardrobe and the Services, the choices you make, and the products and features you use.</span>
                            </span>
                            <span>
                                <LegalBold>Do we process any sensitive personal information?</LegalBold> <span>We do not process sensitive personal information.</span>
                            </span>
                            <span>
                                <LegalBold>Do we receive any information from third parties?</LegalBold> <span>We do not receive any information from third parties.</span>
                            </span>
                            <span>
                                <LegalBold>How do we process your information?</LegalBold> <span>We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so.</span>
                            </span>
                            <span>
                                <LegalBold>In what situations and with which parties do we share personal information?</LegalBold> <span>We may share information in specific situations and with specific third parties.</span>
                            </span>
                            <span>
                                <LegalBold>How do we keep your information safe?</LegalBold> <span>We have organisational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorised third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information.</span>
                            </span>
                            <span>
                                <LegalBold>What are your rights?</LegalBold> <span>Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information.</span>
                            </span>
                            <span>
                                <LegalBold>How do you exercise your rights?</LegalBold> <span>The easiest way to exercise your rights is by submitting a data subject access request by contacting us at legal@wardrobe.gg. We will consider and act upon any request in accordance with applicable data protection laws.</span>
                            </span>


                            <LegalHeading>1. What information do we collect?</LegalHeading>
                            <LegalSubheading>Personal information you disclose to us</LegalSubheading>
                            <LegalInfo><LegalBold>In short:</LegalBold> We collect personal information that you provide to us.</LegalInfo>
                            We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
                            <span><LegalBold>Personal Information Provided By You.</LegalBold><span>The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:</span></span>
                            <ul>
                                <li> - Names</li>
                                <li> - Phone Numbers</li>
                                <li> - Email Addresses</li>
                                <li> - Mailing Addresses</li>
                                <li> - Usernames</li>
                                <li> - Passwords</li>
                                <li> - Contact Preferences</li>
                                <li> - Contact or authentication data</li>
                                <li> - Billing Addresses</li>
                                <li> - Debit / credit card numbers</li>
                            </ul>
                            <span><LegalSubheading>Sensitive Information.</LegalSubheading> We do not process sensitive information.</span>
                            <span>
                                <LegalBold>Payment Data.</LegalBold> <span>We may collect data necessary to process your payment if you make purchases, such as your payment instrument number, and the security code associated with your payment instrument. All payment data is stored by Stripe and PayPal. You may find their privacy notice link(s) here: https://stripe.com/en-gb/privacy and https://www.paypal.com/webapps/mpp/ua/privacy-full.</span>
                            </span>
                            <span>
                                <LegalBold>Social Media Login Data.</LegalBold> <span>We may provide you with the option to register with us using your existing social media account details, like your Facebook, Twitter, or other social media account. If you choose to register in this way, we will collect the information described in the section called <LegalBold>&apos;HOW DO WE HANDLE YOUR SOCIAL LOGINS?&apos;</LegalBold> below.</span>
                            </span>
                            All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.
                            <LegalSubheading>Information Automatically Collected.</LegalSubheading>
                            <LegalInfo><LegalBold>In short:</LegalBold> Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.</LegalInfo>
                            <span>We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.</span>
                            <span>Like many businesses, we also collect information through cookies and similar technologies. </span>
                            <span>The information we collect includes:</span>
                            <ul>
                                <li> - <LegalBold>Log and Usage Data.</LegalBold> Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services and which we record in log files. Depending on how you interact with us, this log data may include your IP address, device information, browser type, and settings and information about your activity in the Services (such as the date/time stamps associated with your usage, pages and files viewed, searches, and other actions you take such as which features you use), device event information (such as system activity, error reports (sometimes called &apos;crash dumps&apos;), and hardware settings).</li>
                                <li> - <LegalBold>Device Data. </LegalBold> We collect device data such as information about your computer, phone, tablet, or other device you use to access the Services. Depending on the device used, this device data may include information such as your IP address (or proxy server), device and application identification numbers, location, browser type, hardware model, Internet service provider and/or mobile carrier, operating system, and system configuration information.</li>
                                <li> - <LegalBold>Location Data. </LegalBold> We collect location data such as information about your device&apos;s location, which can be either precise or imprecise. How much information we collect depends on the type and settings of the device you use to access the Services. For example, we may use GPS and other technologies to collect geolocation data that tells us your current location (based on your IP address). You can opt out of allowing us to collect this information either by refusing access to the information or by disabling your Location setting on your device. However, if you choose to opt out, you may not be able to use certain aspects of the Services.</li>
                            </ul>

                            <LegalHeading>2. HOW DO WE PROCESS YOUR INFORMATION?</LegalHeading>
                            <LegalInfo><LegalBold>In Short: </LegalBold> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.</LegalInfo>

                            <LegalBold>We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</LegalBold>
                            <ul>
                                <li> - <LegalBold>To facilitate account creation and authentication and otherwise manage user accounts.</LegalBold> We may process your information so you can create and log in to your account, as well as keep your account in working order.</li>
                                <li> - <LegalBold>To deliver and facilitate delivery of services to the user.</LegalBold> We may process your information to provide you with the requested service.</li>
                                <li> - <LegalBold>To respond to user inquiries/offer support to users.</LegalBold> We may process your information to respond to your inquiries and solve any potential issues you might have with the requested service.</li>
                                <li> - <LegalBold>To send administrative information to you.</LegalBold> We may process your information to send you details about our products and services, changes to our terms and policies, and other similar information.</li>
                                <li> - <LegalBold>To fulfil and manage your orders.</LegalBold> We may process your information to fulfil and manage your orders, payments, returns, and exchanges made through the Services.</li>
                                <li> - <LegalBold>To enable user-to-user communications.</LegalBold> We may process your information if you choose to use any of our offerings that allow for communication with another user.</li>
                                <li> - <LegalBold>To request feedback.</LegalBold> We may process your information when necessary to request feedback and to contact you about your use of our Services.</li>
                                <li> - <LegalBold>To send you marketing and promotional communications.</LegalBold> We may process the personal information you send to us for our marketing purposes, if this is in accordance with your marketing preferences. You can opt out of our marketing emails at any time.</li>
                                <li> - <LegalBold>To deliver targeted advertising to you.</LegalBold> We may process your information to develop and display personalised content and advertising tailored to your interests, location, and more.</li>
                                <li> - <LegalBold>To protect our Services.</LegalBold> We may process your information as part of our efforts to keep our Services safe and secure, including fraud monitoring and prevention.</li>
                                <li> - <LegalBold>To determine the effectiveness of our marketing and promotional campaigns.</LegalBold> We may process your information to better understand how to provide marketing and promotional campaigns that are most relevant to you.</li>
                                <li> - <LegalBold>To save or protect an individual&apos;s vital interest.</LegalBold> We may process your information when necessary to save or protect an individual’s vital interest, such as to prevent harm.</li>
                            </ul>

                            <LegalHeading>3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?</LegalHeading>
                            <LegalInfo><LegalBold>In Short: </LegalBold> We only process your personal information when we believe it is necessary and we have a valid legal reason (i.e. legal basis) to do so under applicable law, like with your consent, to comply with laws, to provide you with services to enter into or fulfil our contractual obligations, to protect your rights, or to fulfil our legitimate business interests.</LegalInfo>

                            <LegalInfo className="underline">If you are located in the EU or UK, this section applies to you.</LegalInfo>
                            <span>The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the valid legal bases we rely on in order to process your personal information. As such, we may rely on the following legal bases to process your personal information:</span>
                            <ul>
                                <li> - <LegalBold>Consent.</LegalBold> We may process your information if you have given us permission (i.e. consent) to use your personal information for a specific purpose. You can withdraw your consent at any time.</li>
                                <li> - <LegalBold>Performance of a Contract.</LegalBold> We may process your personal information when we believe it is necessary to fulfil our contractual obligations to you, including providing our Services or at your request prior to entering into a contract with you.</li>
                                <li> 
                                    - <LegalBold>Legitimate Interests.</LegalBold> We may process your information when we believe it is reasonably necessary to achieve our legitimate business interests and those interests do not outweigh your interests and fundamental rights and freedoms. For example, we may process your personal information for some of the purposes described in order to:
                                    
                                    <ul>
                                        <li> = Send users information about special offers and discounts on our products and services</li>
                                        <li> = Develop and display personalised and relevant advertising content for our users</li>
                                        <li> = Support our marketing activities</li>
                                        <li> = Diagnose problems and/or prevent fraudulent activities</li>
                                        <li> = Understand how our users use our products and services so we can improve user experience</li>
                                    </ul>
                                    
                                </li>
                                <li> - <LegalBold>Legal Obligations.</LegalBold> We may process your information where we believe it is necessary for compliance with our legal obligations, such as to cooperate with a law enforcement body or regulatory agency, exercise or defend our legal rights, or disclose your information as evidence in litigation in which we are involved.</li>
                                <li> - <LegalBold>Vital Interests.</LegalBold> We may process your information where we believe it is necessary to protect your vital interests or the vital interests of a third party, such as situations involving potential threats to the safety of any person.</li>
                            </ul>

                            <LegalHeading>4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</LegalHeading>
                            <LegalInfo><LegalBold>In Short: </LegalBold> We may share information in specific situations described in this section and/or with the following third parties.</LegalInfo>

                            <span>We may need to share your personal information in the following situations:</span>
                            <ul>
                                <li> - <LegalBold>Business Transfers.</LegalBold> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
                                <li> - <LegalBold>Affiliates.</LegalBold> We may share your information with our affiliates, in which case we will require those affiliates to honour this privacy notice. Affiliates include our parent company and any subsidiaries, joint venture partners, or other companies that we control or that are under common control with us.</li>
                                <li> - <LegalBold>Business Partners.</LegalBold> We may share your information with our business partners to offer you certain products, services, or promotions.</li>
                            </ul>

                            <LegalHeading>5. WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?</LegalHeading>
                            <LegalInfo><LegalBold>In Short: </LegalBold> We are not responsible for the safety of any information that you share with third parties that we may link to or who advertise on our Services, but are not affiliated with, our Services.</LegalInfo>

                            <span>The Services may link to third-party websites, online services, or mobile applications and/or contain advertisements from third parties that are not affiliated with us and which may link to other websites, services, or applications. Accordingly, we do not make any guarantee regarding any such third parties, and we will not be liable for any loss or damage caused by the use of such third-party websites, services, or applications. The inclusion of a link towards a third-party website, service, or application does not imply an endorsement by us. We cannot guarantee the safety and privacy of data you provide to any third parties. Any data collected by third parties is not covered by this privacy notice. We are not responsible for the content or privacy and security practices and policies of any third parties, including other websites, services, or applications that may be linked to or from the Services. You should review the policies of such third parties and contact them directly to respond to your questions.</span>

                            <LegalHeading>6. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</LegalHeading>
                            <LegalInfo><LegalBold>In Short: </LegalBold> We may use cookies and other tracking technologies to collect and store your information.</LegalInfo>

                            <span>We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.</span>


                            <LegalHeading>7. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</LegalHeading>
                            <LegalInfo><LegalBold>In Short: </LegalBold> If you choose to register or log in to our Services using a social media account, we may have access to certain information about you.</LegalInfo>
                        
                            <span>Our Services offer you the ability to register and log in using your third-party social media account details (like your Facebook or Twitter logins). Where you choose to do this, we will receive certain profile information about you from your social media provider. The profile information we receive may vary depending on the social media provider concerned, but will often include your name, email address, friends list, and profile picture, as well as other information you choose to make public on such a social media platform. </span>

                            <span>We will use the information we receive only for the purposes that are described in this privacy notice or that are otherwise made clear to you on the relevant Services. Please note that we do not control, and are not responsible for, other uses of your personal information by your third-party social media provider. We recommend that you review their privacy notice to understand how they collect, use, and share your personal information, and how you can set your privacy preferences on their sites and apps.</span>
                        

                            <LegalHeading>8. HOW LONG DO WE KEEP YOUR INFORMATION?</LegalHeading>
                            <LegalInfo><LegalBold>In Short: </LegalBold> We keep your information for as long as necessary to fulfil the purposes outlined in this privacy notice unless otherwise required by law.</LegalInfo>

                            <span>We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than the period of time in which users have an account with us.</span>

                            <span>When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymise such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.</span>

                            <LegalHeading>9. HOW DO WE KEEP YOUR INFORMATION SAFE?</LegalHeading>
                            <LegalInfo><LegalBold>In Short: </LegalBold> We aim to protect your personal information through a system of organisational and technical security measures.</LegalInfo>

                            <span>We have implemented appropriate and reasonable technical and organisational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorised third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.</span>

                            <LegalHeading>10. WHAT ARE YOUR PRIVACY RIGHTS?</LegalHeading>
                            <LegalInfo><LegalBold>In Short: </LegalBold> In some regions, such as the European Economic Area (EEA) and United Kingdom (UK), you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time.</LegalInfo>


                            <span>In some regions (like the EEA and UK), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability. In certain circumstances, you may also have the right to object to the processing of your personal information. You can make such a request by contacting us by using the contact details provided in the section &apos;HOW CAN YOU CONTACT US ABOUT THIS NOTICE?&apos; below.</span>

                            <span>We will consider and act upon any request in accordance with applicable data protection laws.</span>

                            <span>If you are located in the EEA or UK and you believe we are unlawfully processing your personal information, you also have the right to complain to your <LegalLink to={'https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm'}>Member State data protection authority</LegalLink> or <LegalLink to='https://ico.org.uk/make-a-complaint/data-protection-complaints/data-protection-complaints/'>UK data protection authority</LegalLink>.</span>

                            <span>If you are located in Switzerland, you may contact the <LegalLink to='https://www.edoeb.admin.ch/edoeb/en/home.html'>Federal Data Protection and Information Commissioner</LegalLink>.</span>

                            <span><LegalInfo><span className="underline underline-offset-4">Withdrawing your consent:</span></LegalInfo> If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section &apos;HOW CAN YOU CONTACT US ABOUT THIS NOTICE?&apos; below or updating your preferences.</span>
                        
                            <span>However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.</span>

                            <span><LegalInfo><span className="underline underline-offset-4">Opting out of marketing and promotional communications:</span></LegalInfo> You can unsubscribe from our marketing and promotional communications at any time by clicking on the unsubscribe link in the emails that we send, or by contacting us using the details provided in the section &apos;HOW CAN YOU CONTACT US ABOUT THIS NOTICE?&apos; below. You will then be removed from the marketing lists. However, we may still communicate with you — for example, to send you service-related messages that are necessary for the administration and use of your account, to respond to service requests, or for other non-marketing purposes.</span>

                            <LegalSubheading>Account Information</LegalSubheading>
                            <span>If you would at any time like to review or change the information in your account or terminate your account, you can:</span>
                            <ul>
                                <li> - Log in to your account settings and update your user account.</li>
                                <li> - Contact us using the contact information provided.</li>
                            </ul>
                            <span>Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our legal terms and/or comply with applicable legal requirements.</span>

                            <span><LegalInfo><span className="underline underline-offset-4">Cookies and similar technologies:</span></LegalInfo> Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Services. You may also <LegalLink to='http://www.aboutads.info/choices/'>opt out of interest-based advertising by advertisers</LegalLink> on our Services. </span>

                            <span>If you have questions or comments about your privacy rights, you may email us at legal@wardrobe.gg.</span>

                            <LegalHeading>11. CONTROLS FOR DO-NOT-TRACK FEATURES</LegalHeading>

                            <span>Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track (&apos;DNT&apos;) feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage no uniform technology standard for recognising and implementing DNT signals has been finalised. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy notice.</span>

                            <LegalHeading>12. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</LegalHeading>
                            <LegalInfo><LegalBold>In Short: </LegalBold> Yes, if you are a resident of California, you are granted specific rights regarding access to your personal information.</LegalInfo>

                            <span>California Civil Code Section 1798.83, also known as the &apos;Shine The Light&apos; law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us using the contact information provided below.</span>

                            <span>If you are under 18 years of age, reside in California, and have a registered account with Services, you have the right to request removal of unwanted data that you publicly post on the Services. To request removal of such data, please contact us using the contact information provided below and include the email address associated with your account and a statement that you reside in California. We will make sure the data is not publicly displayed on the Services, but please be aware that the data may not be completely or comprehensively removed from all our systems (e.g. backups, etc.).</span>

                            <LegalSubheading>CCPA Privacy Notice</LegalSubheading>

                            <ul>
                                <li>The California Code of Regulations defines a &apos;resident&apos; as:</li>
                                <li> (1) every individual who is in the State of California for other than a temporary or transitory purpose and</li>
                                <li> (2) every individual who is domiciled in the State of California who is outside the State of California for a temporary or transitory purpose</li>
                            </ul>

                            <span>All other individuals are defined as &apos;non-residents&apos;.</span>

                            <span>If this definition of &apos;resident&apos; applies to you, we must adhere to certain rights and obligations regarding your personal information.</span>

                            <LegalBold>What categories of personal information do we collect?</LegalBold>
                            <span>We have collected the following categories of personal information in the past twelve (12) months:</span>

                            <table class="table-auto w-full">
                                <thead>
                                    <tr>
                                        <th class="px-4 py-2 bg-zinc-200 text-zinc-950">Category</th>
                                        <th class="px-4 py-2 bg-zinc-200 text-zinc-950">Examples</th>
                                        <th class="px-4 py-2 bg-zinc-200 text-zinc-950">Collected</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="border px-4 py-2">A. Identifiers</td>
                                        <td class="border px-4 py-2">Contact details, such as real name, alias, postal address, telephone or mobile contact number, unique personal identifier, online identifier, Internet Protocol address, email address, and account name</td>
                                        <td class="border px-4 py-2">YES</td>
                                    </tr>
                                    <tr>
                                        <td class="border px-4 py-2">B. Personal information categories listed in the California Customer Records statute</td>
                                        <td class="border px-4 py-2">Name, contact information, education, employment, employment history, and financial information</td>
                                        <td class="border px-4 py-2">NO</td>
                                    </tr>
                                    <tr>
                                        <td class="border px-4 py-2">C. Protected classification characteristics under California or federal law</td>
                                        <td class="border px-4 py-2">Gender and date of birth</td>
                                        <td class="border px-4 py-2">NO</td>
                                    </tr>
                                    <tr>
                                        <td class="border px-4 py-2">D. Commercial information</td>
                                        <td class="border px-4 py-2">Transaction information, purchase history, financial details, and payment information</td>
                                        <td class="border px-4 py-2">YES</td>
                                    </tr>
                                    <tr>
                                        <td class="border px-4 py-2">E. Biometric information</td>
                                        <td class="border px-4 py-2">Fingerprints and voiceprints</td>
                                        <td class="border px-4 py-2">NO</td>
                                    </tr>
                                    <tr>
                                        <td class="border px-4 py-2">F. Internet or other similar network activity</td>
                                        <td class="border px-4 py-2">Browsing history, search history, online behaviour, interest data, and interactions with our and other websites, applications, systems, and advertisements</td>
                                        <td class="border px-4 py-2">NO</td>
                                    </tr>
                                    <tr>
                                        <td class="border px-4 py-2">G. Geolocation data</td>
                                        <td class="border px-4 py-2">Device location</td>
                                        <td class="border px-4 py-2">NO</td>
                                    </tr>
                                    <tr>
                                        <td class="border px-4 py-2">H. Audio, electronic, visual, thermal, olfactory, or similar information</td>
                                        <td class="border px-4 py-2">Images and audio, video or call recordings created in connection with our business activities</td>
                                        <td class="border px-4 py-2">NO</td>
                                    </tr>
                                    <tr>
                                        <td class="border px-4 py-2">I. Professional or employment-related information</td>
                                        <td class="border px-4 py-2">Business contact details in order to provide you our Services at a business level or job title, work history, and professional qualifications if you apply for a job with us</td>
                                        <td class="border px-4 py-2">NO</td>
                                    </tr>
                                    <tr>
                                        <td class="border px-4 py-2">J. Education Information</td>
                                        <td class="border px-4 py-2">Student records and directory information</td>
                                        <td class="border px-4 py-2">NO</td>
                                    </tr>
                                    <tr>
                                        <td class="border px-4 py-2">K. Inferences drawn from other personal information</td>
                                        <td class="border px-4 py-2">Inferences drawn from any of the collected personal information listed above to create a profile or summary about, for example, an individual’s preferences and characteristics</td>
                                        <td class="border px-4 py-2">NO</td>
                                    </tr>
                                    <tr>
                                        <td class="border px-4 py-2">L. Sensitive Personal Information</td>
                                        <td class="border px-4 py-2"></td>
                                        <td class="border px-4 py-2">NO</td>
                                    </tr>
                                </tbody>
                            </table>

                            <ul>
                                <li>We will use and retain the collected personal information as needed to provide the Services or for:</li>
                                <li> - Category A - As long as the user has an account with us</li>
                                <li> - Category D - As long as the user has an account with us</li>
                            </ul>

                            <ul>
                                <li>We may also collect other personal information outside of these categories through instances where you interact with us in person, online, or by phone or mail in the context of:</li>
                                <li> - Receiving help through our customer support channels;</li>
                                <li> - Participation in customer surveys or contests; and</li>
                                <li> - Facilitation in the delivery of our Services and to respond to your inquiries.</li>
                            </ul>

                            <LegalBold>How do we use and share your personal information?</LegalBold>
                            <span>More information about our data collection and sharing practices can be found in this privacy notice.</span>
                            <span>You may contact us by email at legal@wardrobe.gg, or by referring to the contact details at the bottom of this document.</span>

                            <span>If you are using an authorised agent to exercise your right to opt out we may deny a request if the authorised agent does not submit proof that they have been validly authorised to act on your behalf.</span>

                            <LegalBold>Will your information be shared with anyone else?</LegalBold>
                            <span>We may disclose your personal information with our service providers pursuant to a written contract between us and each service provider. Each service provider is a for-profit entity that processes the information on our behalf, following the same strict privacy protection obligations mandated by the CCPA.</span>
                            <span>We may use your personal information for our own business purposes, such as for undertaking internal research for technological development and demonstration. This is not considered to be &apos;selling&apos; of your personal information.</span>
                            <span>Wardrobe.gg has not disclosed, sold, or shared any personal information to third parties for a business or commercial purpose in the preceding twelve (12) months. Wardrobe.gg will not sell or share personal information in the future belonging to website visitors, users, and other consumers.</span>

                            <LegalBold>Your rights with respect to your personal data</LegalBold>
                            <span className="underline underline-offset-4">Right to request deletion of the data — Request to delete</span>
                            <span>You can ask for the deletion of your personal information. If you ask us to delete your personal information, we will respect your request and delete your personal information, subject to certain exceptions provided by law, such as (but not limited to) the exercise by another consumer of his or her right to free speech, our compliance requirements resulting from a legal obligation, or any processing that may be required to protect against illegal activities.</span>

                            <span className="underline underline-offset-4">Right to be informed — Request to know</span>
                            <ul>
                                <li>Depending on the circumstances, you have a right to know:</li>
                                <li> - whether we collect and use your personal information;</li>
                                <li> - the categories of personal information that we collect;</li>
                                <li> - the purposes for which the collected personal information is used;</li>
                                <li> - whether we sell or share personal information to third parties;</li>
                                <li> - the categories of personal information that we sold, shared, or disclosed for a business purpose;</li>
                                <li> - the categories of third parties to whom the personal information was sold, shared, or disclosed for a business purpose;</li>
                                <li> - the business or commercial purpose for collecting, selling, or sharing personal information; and</li>
                                <li> - the specific pieces of personal information we collected about you.</li>
                            </ul>
                            
                            <span>In accordance with applicable law, we are not obligated to provide or delete consumer information that is de-identified in response to a consumer request or to re-identify individual data to verify a consumer request.</span>
                        
                            <span className="underline underline-offset-4">Right to Non-Discrimination for the Exercise of a Consumer&apos;s Privacy Rights</span>
                            <span>We will not discriminate against you if you exercise your privacy rights.</span>

                            <span className="underline underline-offset-4">Right to Limit Use and Disclosure of Sensitive Personal Information</span>
                            <span>We do not process consumer&apos;s sensitive personal information.</span>

                            <span className="underline underline-offset-4">Verification process</span>
                            <span>Upon receiving your request, we will need to verify your identity to determine you are the same person about whom we have the information in our system. These verification efforts require us to ask you to provide information so that we can match it with information you have previously provided us. For instance, depending on the type of request you submit, we may ask you to provide certain information so that we can match the information you provide with the information we already have on file, or we may contact you through a communication method (e.g. phone or email) that you have previously provided to us. We may also use other verification methods as the circumstances dictate.</span>
                            <span>We will only use personal information provided in your request to verify your identity or authority to make the request. To the extent possible, we will avoid requesting additional information from you for the purposes of verification. However, if we cannot verify your identity from the information already maintained by us, we may request that you provide additional information for the purposes of verifying your identity and for security or fraud-prevention purposes. We will delete such additionally provided information as soon as we finish verifying you.</span>

                            <span className="underline underline-offset-4">Other privacy rights</span>
                            <ul>
                                <li> - You may object to the processing of your personal information.</li>
                                <li> - You may request correction of your personal data if it is incorrect or no longer relevant, or ask to restrict the processing of the information.</li>
                                <li> - You can designate an authorised agent to make a request under the CCPA on your behalf. We may deny a request from an authorised agent that does not submit proof that they have been validly authorised to act on your behalf in accordance with the CCPA.</li>
                                <li> - You may request to opt out from future selling or sharing of your personal information to third parties. Upon receiving an opt-out request, we will act upon the request as soon as feasibly possible, but no later than fifteen (15) days from the date of the request submission.</li>
                            </ul>
                            <span>To exercise these rights, you can contact us by email at legal@wardrobe.gg, or by referring to the contact details at the bottom of this document. If you have a complaint about how we handle your data, we would like to hear from you.</span>

                            <LegalHeading>13. DO VIRGINIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</LegalHeading>
                            <LegalInfo><LegalBold>In Short: </LegalBold> Yes, if you are a resident of Virginia, you may be granted specific rights regarding access to and use of your personal information.</LegalInfo>

                            <LegalSubheading>Virginia CDPA Privacy Notice</LegalSubheading>
                            <span>Under the Virginia Consumer Data Protection Act (CDPA):</span>
                            <ul>
                                <li>&apos;Consumer&apos; means a natural person who is a resident of the Commonwealth acting only in an individual or household context. It does not include a natural person acting in a commercial or employment context.</li>
                                <li>&apos;Personal data&apos; means any information that is linked or reasonably linkable to an identified or identifiable natural person. &apos;Personal data&apos; does not include de-identified data or publicly available information.</li>
                                <li>&apos;Sale of personal data&apos; means the exchange of personal data for monetary consideration.</li>
                                <li>If this definition &apos;consumer&apos; applies to you, we must adhere to certain rights and obligations regarding your personal data.</li>
                            </ul>

                            <span className="underline underline-offset-4">Your rights with respect to your personal data</span>
                            <ul>
                                <li> - Right to be informed whether or not we are processing your personal data</li>
                                <li> - Right to access your personal data</li>
                                <li> - Right to correct inaccuracies in your personal data</li>
                                <li> - Right to request deletion of your personal data</li>
                                <li> - Right to obtain a copy of the personal data you previously shared with us</li>
                                <li> - Right to opt out of the processing of your personal data if it is used for targeted advertising, the sale of personal data, or profiling in furtherance of decisions that produce legal or similarly significant effects (&apos;profiling&apos;)</li>
                            </ul>

                            <span>Wardrobe.gg has not sold any personal data to third parties for business or commercial purposes. Wardrobe.gg will not sell personal data in the future belonging to website visitors, users, and other consumers.</span>

                            <span className="underline underline-offset-4">Exercise your rights provided under the Virginia CDPA</span>
                            <span>More information about our data collection and sharing practices can be found in this privacy notice.</span>
                            <span>You may contact us by email at legal@wardrobe.gg, by submitting a <LegalLink to='mailto:legal@wardrobe.gg'>data subject access request</LegalLink>, or by referring to the contact details at the bottom of this document.</span>
                            <span>If you are using an authorised agent to exercise your rights, we may deny a request if the authorised agent does not submit proof that they have been validly authorised to act on your behalf.</span>

                            <span className="underline underline-offset-4">Verification process</span>
                            <span>We may request that you provide additional information reasonably necessary to verify you and your consumer&apos;s request. If you submit the request through an authorised agent, we may need to collect additional information to verify your identity before processing your request.</span>
                            <span>Upon receiving your request, we will respond without undue delay, but in all cases, within forty-five (45) days of receipt. The response period may be extended once by forty-five (45) additional days when reasonably necessary. We will inform you of any such extension within the initial 45-day response period, together with the reason for the extension.</span>

                            <span className="underline underline-offset-4">Right to appeal</span>
                            <span>If we decline to take action regarding your request, we will inform you of our decision and reasoning behind it. If you wish to appeal our decision, please email us at legal@wardrobe.gg. Within sixty (60) days of receipt of an appeal, we will inform you in writing of any action taken or not taken in response to the appeal, including a written explanation of the reasons for the decisions. If your appeal if denied, you may contact the <LegalLink to='https://www.oag.state.va.us/consumer-protection/index.php/file-a-complaint'>Attorney General to submit a complaint</LegalLink>.</span>

                            <LegalHeading>14. DO WE MAKE UPDATES TO THIS NOTICE?</LegalHeading>
                            <LegalInfo><LegalBold>In Short: </LegalBold> Yes, we will update this notice as necessary to stay compliant with relevant laws.</LegalInfo>

                            <span>We may update this privacy notice from time to time. The updated version will be indicated by an updated &apos;Revised&apos; date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.</span>

                            <LegalHeading>15. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</LegalHeading>
                            <span>If you have questions or comments about this notice, you may email us at legal@wardrobe.gg or contact us by post at:</span>

                            <ul>
                                <li>Wardrobe.gg</li>
                                <li>49 Station Road</li>
                                <li>Polegate, East Sussex, BN26 6EA </li>
                                <li>United Kingdom</li>
                            </ul>

                            <LegalHeading>16. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</LegalHeading>
                            <span>Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, change that information, or delete it. To request to review, update, or delete your personal information, please fill out and submit a <LegalLink to='https://app.termly.io/notify/e902ee81-9581-436a-9113-861e667c4233'>data subject access request</LegalLink>.</span>

                        </div>
                        </section>
                    </div>
                </div>
            </main>
        </>
    )
}