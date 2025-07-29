// src/app/privacy-policy/page.tsx

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto py-16 md:py-24 px-5">
        <div className="prose prose-lg max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl pb-2">Privacy Policy</h1>
          <p className="text-muted-foreground pb-2">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <p>
            BeOnce ("us", "we", or "our") operates the https://beonce.com website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
          </p>

          <h2 className="text-2xl font-bold tracking-tight font-headline sm:text-3xl mt-8 pb-2">Information Collection and Use</h2>
          <p>
            We collect several different types of information for various purposes to provide and improve our Service to you.
          </p>
          <h3 className="pb-2">Types of Data Collected</h3>
          <h4 className="pb-2">Personal Data</h4>
          <p>
            While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:
          </p>
          <ul>
            <li>Email address</li>
            <li>First name and last name</li>
            <li>Phone number</li>
            <li>Address, State, Province, ZIP/Postal code, City</li>
            <li>Cookies and Usage Data</li>
          </ul>

          <h4 className="pb-2">Usage Data</h4>
          <p>
            We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
          </p>

          <h2 className="text-2xl font-bold tracking-tight font-headline sm:text-3xl mt-8 pb-2">Use of Data</h2>
          <p>BeOnce uses the collected data for various purposes:</p>
          <ul>
            <li>To provide and maintain our Service</li>
            <li>To notify you about changes to our Service</li>
            <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information so that we can improve our Service</li>
            <li>To monitor the usage of our Service</li>
            <li>To detect, prevent and address technical issues</li>
            <li>To provide you with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless you have opted not to receive such information</li>
          </ul>

          <h2 className="text-2xl font-bold tracking-tight font-headline sm:text-3xl mt-8 pb-2">Disclosure of Data</h2>
          <p>
            We may disclose your Personal Data in the good faith belief that such action is necessary to:
          </p>
          <ul>
            <li>To comply with a legal obligation</li>
            <li>To protect and defend the rights or property of BeOnce</li>
            <li>To prevent or investigate possible wrongdoing in connection with the Service</li>
            <li>To protect the personal safety of users of the Service or the public</li>
            <li>To protect against legal liability</li>
          </ul>

          <h2 className="text-2xl font-bold tracking-tight font-headline sm:text-3xl mt-8 pb-2">Security of Data</h2>
          <p>
            The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
          </p>

          <h2 className="text-2xl font-bold tracking-tight font-headline sm:text-3xl mt-8 pb-2">Your Rights</h2>
          <p>
            You have the right to access, update or delete the information we have on you. Whenever made possible, you can access, update or request deletion of your Personal Data directly within your account settings section. If you are unable to perform these actions yourself, please contact us to assist you.
          </p>

          <h2 className="text-2xl font-bold tracking-tight font-headline sm:text-3xl mt-8 pb-2">Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "last updated" date at the top of this Privacy Policy.
          </p>

          <h2 className="text-2xl font-bold tracking-tight font-headline sm:text-3xl mt-8 pb-2">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us by visiting the contact page on our website.
          </p>
        </div>
      </div>
    </div>
  );
}
