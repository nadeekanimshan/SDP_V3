import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "How do I book a recording session?",
      answer:
        "You can book a session through our online portal, by phone, or by visiting our studio in person. Online bookings require a 50% deposit to secure your time slot.",
    },
    {
      question: "What equipment do you provide?",
      answer:
        "We offer state-of-the-art recording equipment including Neumann microphones, Pro Tools HD systems, outboard gear from Universal Audio, and a selection of premium instruments.",
    },
    {
      question: "Can I bring my own engineer?",
      answer:
        "Absolutely! While we have excellent in-house engineers, you're welcome to bring your own. We do require advance notice for outside engineers.",
    },
    {
      question: "What's your cancellation policy?",
      answer:
        "Sessions can be cancelled or rescheduled up to 48 hours in advance for a full refund. Cancellations within 48 hours forfeit the deposit.",
    },
    {
      question: "Do you offer mixing/mastering services?",
      answer:
        "Yes, we provide professional mixing and mastering services. Many clients record with us and then use our post-production services to complete their projects.",
    },
  ];

  return (
    <section className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Find answers to common questions about our studio services
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center text-left px-4 py-3 md:py-4 bg-gray-200 hover:bg-gray-300 transition-all duration-200"
              >
                <span className="font-medium text-gray-800">
                  {item.question}
                </span>
                {activeIndex === index ? (
                  <FiChevronUp className="text-xl text-gray-800" />
                ) : (
                  <FiChevronDown className="text-xl text-gray-800" />
                )}
              </button>
              {activeIndex === index && (
                <div className="px-4 py-3 bg-white text-gray-700 text-sm md:text-base">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-gray-700 mb-4">Still have questions?</p>
          <button className="bg-black text-white px-6 py-2 rounded hover:bg-blue-700 transition">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
