"use client";
import "react-datepicker/dist/react-datepicker.css";
import { chakra_petch } from "~/app/utils/font";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { cn } from "~/lib/utils";
import { vendorDetail } from "~/types";

const Faqs = () => {
  return (
    <section className="bg-slate-50 px-4 py-6 sm:py-10 md:py-20">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-10">
          <h1
            className={cn(
              "mb-4 text-4xl font-semibold",
              chakra_petch.className,
            )}
          >
            Frequently Asked Questions (FAQs)
          </h1>
          <p className="lg:7/12 w-full text-lg text-slate-600 md:w-9/12">
            Have questions? Check out our FAQ section for quick answers to the
            most common inquiries. We&apos;ve got you covered!
          </p>
        </div>

        <div>
          <Accordion type="multiple">
            {vendorDetail.faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Faqs;
