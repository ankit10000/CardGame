// Screens/NoticeScreen.tsx

import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';

const NoticeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#313332" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.headerButton}>
                    <Icon name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Privacy Policy</Text>
                 <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('AddFund')}>
                    <View style={styles.walletContainer}>
                        <Icon name="account-balance-wallet" size={20} color={"#e5a550"} />
                        <Text style={styles.walletText}>0</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Content */}
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                 <View style={styles.contentBox}>
                    {/* --- Start of Privacy Policy Text --- */}

                    {/* Initial Titles */}
                    <Text style={styles.mainTitle}>Privacy Policy for Milan Star</Text>
                    <Text style={styles.subTitle}>Privacy Policy</Text>

                    {/* Last Updated */}
                    <Text style={styles.lastUpdated}>Last updated: Jan 31, 2025</Text>

                    {/* Introductory Paragraphs */}
                    <Text style={styles.paragraph}>
                        This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
                    </Text>
                    <Text style={styles.paragraph}>
                        We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the Free Privacy Policy Generator.
                    </Text>

                    {/* Interpretation and Definitions */}
                    <Text style={styles.sectionTitle}>Interpretation and Definitions</Text>
                    <Text style={styles.subTitle}>Interpretation</Text>
                    <Text style={styles.paragraph}>
                        The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                    </Text>

                    <Text style={styles.subTitle}>Definitions</Text>
                    <Text style={styles.paragraph}>
                        For the purposes of this Privacy Policy:
                    </Text>
                    <Text style={styles.definitionItem}>
                        <Text style={styles.definitionTerm}>Account</Text> means a unique account created for You to access our Service or parts of our Service.
                    </Text>
                    <Text style={styles.definitionItem}>
                        <Text style={styles.definitionTerm}>Affiliate</Text> means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.
                    </Text>
                    <Text style={styles.definitionItem}>
                        <Text style={styles.definitionTerm}>Application</Text> refers to Milan Star, the software program provided by the Company.
                    </Text>
                    <Text style={styles.definitionItem}>
                        <Text style={styles.definitionTerm}>Company</Text> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Milan Star.
                    </Text>
                     <Text style={styles.definitionItem}>
                        <Text style={styles.definitionTerm}>Country</Text> refers to: Rajasthan, India
                    </Text>
                     <Text style={styles.definitionItem}>
                        <Text style={styles.definitionTerm}>Device</Text> means any device that can access the Service such as a computer, a cellphone or a digital tablet.
                    </Text>
                    <Text style={styles.definitionItem}>
                        <Text style={styles.definitionTerm}>Personal Data</Text> is any information that relates to an identified or identifiable individual.
                    </Text>
                     <Text style={styles.definitionItem}>
                        <Text style={styles.definitionTerm}>Service</Text> refers to the Application.
                    </Text>
                    <Text style={styles.definitionItem}>
                        <Text style={styles.definitionTerm}>Service Provider</Text> means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.
                    </Text>
                    <Text style={styles.definitionItem}>
                        <Text style={styles.definitionTerm}>Usage Data</Text> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).
                    </Text>
                    <Text style={styles.definitionItem}>
                        <Text style={styles.definitionTerm}>You</Text> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.
                    </Text>

                     {/* Collecting and Using Your Personal Data */}
                    <Text style={styles.sectionTitle}>Collecting and Using Your Personal Data</Text>
                    <Text style={styles.subTitle}>Types of Data Collected</Text>
                    <Text style={styles.subSubTitle}>Personal Data</Text>
                    <Text style={styles.paragraph}>
                        While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
                    </Text>
                    {/* Note: The specific list items like "First name and last name" etc. are formatted slightly differently below */}
                    <Text style={styles.listItem}>First name and last name</Text>
                    <Text style={styles.listItem}>Phone number</Text>
                    <Text style={styles.listItem}>Usage Data</Text>

                    <Text style={styles.subSubTitle}>Usage Data</Text>
                    <Text style={styles.paragraph}>
                        Usage Data is collected automatically when using the Service.
                    </Text>
                    <Text style={styles.paragraph}>
                        Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
                    </Text>
                    <Text style={styles.paragraph}>
                         When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.
                    </Text>
                     <Text style={styles.paragraph}>
                        We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.
                    </Text>

                    {/* Use of Your Personal Data */}
                    <Text style={styles.sectionTitle}>Use of Your Personal Data</Text>
                    <Text style={styles.paragraph}>
                        The Company may use Personal Data for the following purposes:
                    </Text>
                     <Text style={styles.listItemSpaced}>
                        <Text style={styles.bold}>To provide and maintain our Service,</Text> including to monitor the usage of our Service.
                    </Text>
                    <Text style={styles.listItemSpaced}>
                        <Text style={styles.bold}>To manage Your Account:</Text> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.
                    </Text>
                    <Text style={styles.listItemSpaced}>
                        <Text style={styles.bold}>For the performance of a contract:</Text> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.
                    </Text>
                     <Text style={styles.listItemSpaced}>
                        <Text style={styles.bold}>To contact You:</Text> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.
                    </Text>
                     <Text style={styles.listItemSpaced}>
                        <Text style={styles.bold}>To provide You</Text> with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.
                    </Text>
                     <Text style={styles.listItemSpaced}>
                        <Text style={styles.bold}>To manage Your requests:</Text> To attend and manage Your requests to Us.
                    </Text>
                    <Text style={styles.listItemSpaced}>
                        <Text style={styles.bold}>For business transfers:</Text> We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.
                    </Text>
                    <Text style={styles.listItemSpaced}>
                        <Text style={styles.bold}>For other purposes:</Text> We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.
                    </Text>

                     <Text style={styles.paragraph}>
                        We may share Your personal information in the following situations:
                    </Text>
                     <Text style={styles.listItemSpaced}>
                        <Text style={styles.bold}>With Service Providers:</Text> We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to contact You.
                    </Text>
                     <Text style={styles.listItemSpaced}>
                        <Text style={styles.bold}>For business transfers:</Text> We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.
                    </Text>
                    <Text style={styles.listItemSpaced}>
                        <Text style={styles.bold}>With Affiliates:</Text> We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.
                    </Text>
                     <Text style={styles.listItemSpaced}>
                        <Text style={styles.bold}>With business partners:</Text> We may share Your information with Our business partners to offer You certain products, services or promotions.
                    </Text>
                     <Text style={styles.listItemSpaced}>
                        <Text style={styles.bold}>With other users:</Text> when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside.
                    </Text>
                    <Text style={styles.listItemSpaced}>
                         <Text style={styles.bold}>With Your consent:</Text> We may disclose Your personal information for any other purpose with Your consent.
                    </Text>

                    {/* Retention of Your Personal Data */}
                    <Text style={styles.sectionTitle}>Retention of Your Personal Data</Text>
                    <Text style={styles.paragraph}>
                        The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.
                    </Text>
                    <Text style={styles.paragraph}>
                         The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.
                    </Text>

                    {/* Transfer of Your Personal Data */}
                     <Text style={styles.sectionTitle}>Transfer of Your Personal Data</Text>
                    <Text style={styles.paragraph}>
                        Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.
                    </Text>
                    <Text style={styles.paragraph}>
                        Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.
                    </Text>
                    <Text style={styles.paragraph}>
                         The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.
                    </Text>

                     {/* Delete Your Personal Data */}
                    <Text style={styles.sectionTitle}>Delete Your Personal Data</Text>
                    <Text style={styles.paragraph}>
                        You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You.
                    </Text>
                    <Text style={styles.paragraph}>
                        Our Service may give You the ability to delete certain information about You from within the Service.
                    </Text>
                     <Text style={styles.paragraph}>
                         You may update, amend, or delete Your information at any time by signing in to Your Account, if you have one, and visiting the account settings section that allows you to manage Your personal information. You may also contact Us to request access to, correct, or delete any personal information that You have provided to Us.
                    </Text>
                     <Text style={styles.paragraph}>
                         Please note, however, that We may need to retain certain information when we have a legal obligation or lawful basis to do so.
                    </Text>

                     {/* Disclosure of Your Personal Data */}
                    <Text style={styles.sectionTitle}>Disclosure of Your Personal Data</Text>
                    <Text style={styles.subTitle}>Business Transactions</Text>
                     <Text style={styles.paragraph}>
                        If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.
                    </Text>
                    <Text style={styles.subTitle}>Law enforcement</Text>
                    <Text style={styles.paragraph}>
                        Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).
                    </Text>
                    <Text style={styles.subTitle}>Other legal requirements</Text>
                     <Text style={styles.paragraph}>
                         The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:
                    </Text>
                    {/* Using simple list items here */}
                     <Text style={styles.listItemBullet}>Comply with a legal obligation</Text>
                    <Text style={styles.listItemBullet}>Protect and defend the rights or property of the Company</Text>
                    <Text style={styles.listItemBullet}>Prevent or investigate possible wrongdoing in connection with the Service</Text>
                     <Text style={styles.listItemBullet}>Protect the personal safety of Users of the Service or the public</Text>
                    <Text style={styles.listItemBullet}>Protect against legal liability</Text>

                     <Text style={styles.subTitle}>Security of Your Personal Data</Text>
                     <Text style={styles.paragraph}>
                        The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.
                    </Text>

                    {/* Children's Privacy */}
                    <Text style={styles.sectionTitle}>Children's Privacy</Text>
                     <Text style={styles.paragraph}>
                        Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.
                    </Text>
                     <Text style={styles.paragraph}>
                        If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent's consent before We collect and use that information.
                    </Text>

                    {/* Links to Other Websites */}
                    <Text style={styles.sectionTitle}>Links to Other Websites</Text>
                    <Text style={styles.paragraph}>
                        Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.
                    </Text>
                     <Text style={styles.paragraph}>
                         We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
                    </Text>

                    {/* Changes to this Privacy Policy */}
                    <Text style={styles.sectionTitle}>Changes to this Privacy Policy</Text>
                     <Text style={styles.paragraph}>
                         We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.
                    </Text>
                     <Text style={styles.paragraph}>
                         We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.
                    </Text>
                     <Text style={styles.paragraph}>
                        You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                    </Text>

                    {/* Contact Us */}
                    <Text style={styles.sectionTitle}>Contact Us</Text>
                    <Text style={styles.paragraph}>
                        If you have any questions about this Privacy Policy, You can contact us:
                    </Text>
                    <Text style={styles.listItem}>By email: milanstar0811@gmail.com</Text>

                    {/* Footer Note */}
                    <Text style={styles.footerNote}>
                         Generated using Free Privacy Policy Generator
                    </Text>

                    {/* --- End of Privacy Policy Text --- */}
                 </View>
            </ScrollView>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8F9FA', // Light background
    },
     header: { /* ... same as previous screens ... */
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#934b47',
        paddingVertical: 12,
        paddingHorizontal: 15,
    },
    headerButton: { /* ... same ... */
        padding: 5,
        minWidth: 40,
        alignItems: 'center',
    },
    headerTitle: { /* ... same ... */
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    headerRightIconContainer: { /* ... same ... */
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        padding: 5,
    },
    badge: { /* ... same ... */
        position: 'absolute',
        top: -2,
        right: -5,
        backgroundColor: '#FFA500',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    badgeText: { /* ... same ... */
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    scrollContainer: {
        paddingVertical: 20, // Add vertical padding for scroll content
        paddingHorizontal: 15, // Add horizontal padding
    },
    contentBox: {
        backgroundColor: '#fff', // White background for the text area
        borderRadius: 8,
        padding: 15,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    mainTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    lastUpdated: {
        fontSize: 14,
        color: '#777',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 25,
        marginBottom: 15,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 15,
    },
    subTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#444',
        marginTop: 10,
        marginBottom: 10,
    },
     subSubTitle: {
        fontSize: 15,
        fontWeight: '600', // Semi-bold
        color: '#444',
        marginTop: 15,
        marginBottom: 10,
    },
    paragraph: {
        fontSize: 15,
        color: '#555',
        lineHeight: 23, // Adjust for readability
        marginBottom: 15,
    },
    walletContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 15,
    },
    definitionItem: {
        fontSize: 15,
        color: '#555',
        lineHeight: 23,
        marginBottom: 10,
        marginLeft: 10, // Indent definitions slightly
    },
    definitionTerm: {
        fontWeight: 'bold',
    },
    listItem: {
        fontSize: 15,
        color: '#555',
        lineHeight: 23,
        marginBottom: 8,
        marginLeft: 15, // Indent list items
    },
     listItemSpaced: { // For lists where each item is more paragraph-like
        fontSize: 15,
        color: '#555',
        lineHeight: 23,
        marginBottom: 15, // More spacing
        marginLeft: 10,
    },
    listItemBullet: { // Simple bulleted list style
        fontSize: 15,
        color: '#555',
        lineHeight: 23,
        marginBottom: 5,
        marginLeft: 15,
        // Adding a bullet point visually
        // This is a basic approach, more complex lists might need libraries
        // Or use a unicode bullet character directly in the text: •
        // Example using pseudo-element styling (not directly possible in RN Text)
        // We'll just indent for simplicity here.
    },
    bold: {
        fontWeight: 'bold',
    },
    footerNote: {
        fontSize: 12,
        color: '#888',
        marginTop: 30,
        textAlign: 'center',
        fontStyle: 'italic',
    }
});

export default NoticeScreen;