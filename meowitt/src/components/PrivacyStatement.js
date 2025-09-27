import React from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";

const PrivacyStatement = () => {
    return (
        <div className={"card"}>
            <NavLink to={"/register"}>Back to Register</NavLink>
            <h1>Privacy Policy for Meowit</h1>

            <h2>1. Introduction</h2>
            <p>We respect your privacy and are committed to protecting any personal information you share with us. This
                policy explains what information we collect, how we use it, and the steps we take to ensure your data is
                safe.</p>

            <h2>2. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul>
                <li><strong>Personal Information:</strong> If you create an account, sign up for newsletters, or make
                    purchases, we may collect your name, email address, and payment information.
                </li>
                <li><strong>Non-Personal Information:</strong> We collect information about how you use our site (e.g.,
                    pages visited, time spent) through cookies and similar technologies.
                </li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
                <li>Provide and improve our services, including tailoring content to your preferences (e.g., recommended
                    cat care tips, products).
                </li>
                <li>Communicate with you about updates, promotions, or your account.</li>
                <li>Meow mewo mewoow.</li>
            </ul>

            <h2>4. Catnip</h2>
            <p>We use catnip to enhance your browsing experience by remembering your preferences and analyzing traffic.
                You can control or disable catnip by just saying no, though this may affect site functionality.</p>

            <h2>5. Third-Party Services</h2>
            <p>We will not use third-party services for analytics (e.g., Google Analytics) or payment processing. These
                third-party services may collect data in accordance with their own privacy policies.</p>

            <h2>6. Data Sharing</h2>
            <p>We do not sell or share your personal information with third parties for marketing purposes. However, we
                may share your data with our feline friends:</p>
            <ul>
                <li>With service providers who assist in website operations (e.g., payment processors).</li>
                <li>If required by law or to protect the rights of our website.</li>
            </ul>

            <h2>7. Security</h2>
            <p>We take reasonable measures to protect your personal information from unauthorized access or
                disclosure.(such as clawing and biting) However, no method of transmission over the internet is
                completely secure, and we cannot guarantee absolute security.</p>

            <h2>8. Children’s Privacy</h2>
            <p>Our website is not intended for children under 13. We do not knowingly collect personal information from
                children without parental consent. If you believe we have inadvertently collected such information,
                please contact us to have it removed.</p>

            <h2>9. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
                <li>Access the personal information we hold about you.</li>
                <li>Request corrections to inaccurate or outdated information.</li>
                <li>Delete your personal data, subject to certain exceptions.</li>
            </ul>

            <h2>10. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the
                "last updated" date will be revised accordingly.</p>

            <h2>11. Contact Us</h2>
            <p>If you have any questions or concerns about this Privacy Policy, please do not contact us </p>
        </div>
    );

}

export default PrivacyStatement;