import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Footer from "@/components/Footer";

const WHATSAPP_NUMBERS = ["+263772664960", "+263779146262"];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    // Construct the WhatsApp message
    const whatsappMessage = `New Contact Form Submission
Name: ${formData.name.trim()}
Phone: ${formData.phone.trim()}
Email: ${formData.email.trim()}
Subject: ${formData.subject.trim()}
Message: ${formData.message.trim()}`;

    // Randomly select one of the two numbers (50/50)
    const selectedNumber = WHATSAPP_NUMBERS[Math.floor(Math.random() * 2)];

    // Remove the + for wa.me URL
    const numberForUrl = selectedNumber.replace("+", "");

    // URL encode the message
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Construct WhatsApp URL
    const whatsappUrl = `https://wa.me/${numberForUrl}?text=${encodedMessage}`;

    toast({
      title: "Redirecting to WhatsApp",
      description: "You'll be redirected to send your message via WhatsApp.",
    });

    // Reset form
    setFormData({ name: "", phone: "", email: "", subject: "", message: "" });

    // Redirect to WhatsApp
    window.open(whatsappUrl, "_blank");

    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <div className="relative pt-32 bg-cream">
        <div className="absolute inset-0 bg-[url('https://cdn.pixabay.com/photo/2023/05/03/09/16/rooster-7967058_1280.jpg')] bg-cover bg-center bg-no-repeat opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal mb-6">
              Contact Us
            </h1>
            <p className="text-lg text-charcoal/80 max-w-2xl mx-auto font-inter">
              Get in touch with us for any inquiries about our breeds or services
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <h2 className="font-playfair text-3xl font-bold text-charcoal mb-8">
                Get in Touch
              </h2>

              <div className="grid gap-8">
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-mutedGold shrink-0" />
                    <div>
                      <h3 className="font-playfair text-lg font-semibold text-charcoal">
                        Location
                      </h3>
                      <p className="text-charcoal/80 font-inter">
                        Bulawayo, Zimbabwe
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-mutedGold shrink-0" />
                    <div>
                      <h3 className="font-playfair text-lg font-semibold text-charcoal">
                        Email
                      </h3>
                      <a
                        href="mailto:sales@atomcchickens.co.zw"
                        className="text-charcoal/80 hover:text-charcoal font-inter"
                      >
                        sales@atomcchickens.co.zw
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-mutedGold shrink-0" />
                    <div>
                      <h3 className="font-playfair text-lg font-semibold text-charcoal">
                        Phone
                      </h3>
                      <a
                        href="tel:+263772664960"
                        className="text-charcoal/80 hover:text-charcoal font-inter"
                      >
                        +263 772 664 960
                      </a> <br />
                      <a
                        href="tel:+263779146262"
                        className="text-charcoal/80 hover:text-charcoal font-inter"
                      >
                        +263 779 146 262
                      </a> <br />
                      <a
                        href="tel:+263292250443"
                        className="text-charcoal/80 hover:text-charcoal font-inter"
                      >
                        +263 29 225 0443
                      </a>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-cream p-8 rounded-lg">
              <h2 className="font-playfair text-3xl font-bold text-charcoal mb-8">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    placeholder="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-white"
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    placeholder="Your Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="bg-white"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-white"
                  />
                </div>
                <div>
                  <Input
                    placeholder="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-white"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Your Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="min-h-[150px] bg-white"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-warmBrown hover:bg-warmBrown/90 text-white font-inter"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Sending..." : "Send via WhatsApp"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
