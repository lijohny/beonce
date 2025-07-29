// src/app/terms-of-service/page.tsx

export default function TermsOfServicePage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto py-16 md:py-24 px-5">
        <div className="prose prose-lg max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl pb-2">Terms of Service</h1>
          <p className="text-muted-foreground pb-2">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <p>
            Welcome to BeOnce. These Terms of Service ("Terms") govern your use of the services provided by BeOnce ("we," "us," or "our"), including but not limited to home construction, design, and consultancy services. By engaging our services, you agree to be bound by these Terms.
          </p>

          <h2 className="text-2xl font-bold tracking-tight font-headline sm:text-3xl mt-8 pb-2">1. Scope of Services</h2>
          <p>
            BeOnce offers a comprehensive, end-to-end home building solution. Our services are designed to manage every aspect of your project from conception to completion. Our standard services include:
          </p>
          <ul>
            <li><strong>Full-Scale Construction:</strong> Complete home building from the foundation (basement) to the final handover of the keys.</li>
            <li><strong>Architectural & Civil Work:</strong> All necessary civil engineering and structural work to ensure a safe and durable home.</li>
            <li><strong>Paperwork & Approvals:</strong> Management of essential documentation, including plan approvals and other necessary permits.</li>
            <li><strong>Loan Assistance:</strong> We provide dedicated support and guidance to help you through the home loan application process.</li>
            <li><strong>Interior & Exterior Finishes:</strong> Complete interior and exterior work, including:
              <ul>
                <li>Painting (both interior and exterior walls)</li>
                <li>Tiling for floors and walls</li>
                <li>Electrical wiring, fixtures, and fittings</li>
              </ul>
            </li>
            <li><strong>Design Services:</strong> Both interior and exterior design to create a cohesive and modern aesthetic for your home.</li>
          </ul>

          <h2 className="text-2xl font-bold tracking-tight font-headline sm:text-3xl mt-8 pb-2">2. Client Responsibilities</h2>
          <p>As a client, you agree to:</p>
          <ul>
            <li>Provide accurate and complete information regarding your project requirements, land ownership, and budget.</li>
            <li>Cooperate with our team to facilitate timely decision-making.</li>
            <li>Ensure timely payments as per the agreed-upon schedule.</li>
            <li>Secure and provide access to the construction site.</li>
          </ul>

          <h2 className="text-2xl font-bold tracking-tight font-headline sm:text-3xl mt-8 pb-2">3. Payment Terms</h2>
          <p>
            Project costs and payment schedules will be detailed in a separate, formal agreement. All payments are to be made in accordance with the milestones outlined in that agreement. Delays in payment may result in project delays.
          </p>

          <h2 className="text-2xl font-bold tracking-tight font-headline sm:text-3xl mt-8 pb-2">4. Changes and Modifications</h2>
          <p>
            Any changes to the project scope, design, or materials after the final agreement is signed must be documented in a written change order. Such changes may impact the project cost and timeline.
          </p>
          
          <h2 className="text-2xl font-bold tracking-tight font-headline sm:text-3xl mt-8 pb-2">5. Limitation of Liability</h2>
          <p>
            While we strive for perfection, BeOnce shall not be liable for delays or failures caused by factors beyond our reasonable control, including but not limited to natural disasters, government actions, or supply chain disruptions. Our liability is limited to the total service fee paid for the project.
          </p>

          <h2 className="text-2xl font-bold tracking-tight font-headline sm:text-3xl mt-8 pb-2">6. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which the project is located.
          </p>

          <h2 className="text-2xl font-bold tracking-tight font-headline sm:text-3xl mt-8 pb-2">7. Changes to These Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms of Service on this page. Your continued engagement of our services after such changes constitutes your acceptance of the new Terms.
          </p>
          
          <h2 className="text-2xl font-bold tracking-tight font-headline sm:text-3xl mt-8 pb-2">Contact Us</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us through the information provided on our website's contact page.
          </p>
        </div>
      </div>
    </div>
  );
}
