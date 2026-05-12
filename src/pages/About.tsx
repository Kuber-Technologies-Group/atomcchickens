import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Egg, Book, Dna, MessageSquare, Heart, Star, Images } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        url="/about"
        title="About Us"
        description="Since 2014, Atomc Chickens has been Bulawayo's leading indigenous poultry breeder. ZITF Champion Hen 2024, Champion Rooster 2025. Meet our team and learn our story."
      />
      <Navigation />

      {/* Hero Section */}
      <div className="relative pt-32 bg-cream">
        <div className="absolute inset-0 bg-[url('https://cdn.pixabay.com/photo/2016/11/29/05/25/chicken-1867521_1280.jpg')] bg-cover bg-center bg-no-repeat opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal mb-6">Our Story</h1>
            <p className="text-lg text-charcoal/80 max-w-2xl mx-auto font-inter">


              <p className="mb-4">
                Pioneering Indigenous Poultry Breeding in Zimbabwe Since 2014
              </p>

              <p>
                Founded in 2014, Atomc Chickens began with a deeply personal turning point. A routine medical check-up brought an unexpected warning of <b>high cholesterol</b> and, with it, medical advice to adopt a healthier lifestyle and diet. This moment sparked a journey toward healthier, natural food choices, leading to the discovery of the benefits of free-range, naturally raised chicken.
                What started as a personal commitment to healthy eating soon grew into a passion for rearing road runner and exotic chickens using organic and sustainable methods.
              </p>

              <p>

                Recognizing the need for quality, naturally raised poultry in Zimbabwe, Atomc Chickens was born, driven by purpose, health, and a desire to raise the standard of indigenous poultry breeding.
                Rooted in organic and sustainable farming principles, we remain committed to breeding healthy, resilient birds that excel in show, meat, and egg production.
              </p>
              Through careful genetic selection, natural rearing practices, and strict biosecurity, our birds have consistently met high standards, earning recognition, including exotic championship success at the Zimbabwe International Trade Fair (ZITF). Our chickens collected various awards ranging from 1st prizes to 3rd prizes in different categories with our Buff Orpington Hen being judged the Exotic Champion Hen for 2024, our Rhode Island Red pair were judged the Exotic Reserve Champion Rooster, and Exotic Reserve Champion Hen for 2024 respectively; Our Light Brahma pair was judged the Exotic Champion Rooster and Exotic Champion Hen for 2025 respectively and our Buff Orpingtons Hen judged the Exotic Reserve Champion Hen for 2025.

              <p>

                As an indigenous Zimbabwean enterprise, we take pride in empowering farmers, backyard keepers, and poultry enthusiasts with quality birds and expert guidance, helping them build sustainable and profitable poultry ventures.

              </p>

              <p>

                Our journey continues with a clear vision: to lead with excellence, steward our birds responsibly, and deliver value with every chick we raise.

              </p>

              <p className="mt-6  text-lg">
                Atomc Chickens - <span className="font-bold italic text-charcoal">Hatched with Purpose. Breeding Excellence, One Chick at a Time.</span>

              </p>
            </p>
          </div>
        </div>
      </div>

      {/* Vision & Mission Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-1 gap-12 items-start">

            {/* About Us */}
            <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">

              <h2 className="font-playfair text-3xl font-bold text-charcoal mb-6">About Us</h2>

              <p className="text-lg text-charcoal/80 mb-4 font-inter">
                Atomc Chickens is a premier Indigenous Poultry Company based in Bulawayo, Zimbabwe,
                specializing in the breeding and supply of exceptional roadrunner chickens since 2014.
              </p>
              <p className="text-lg text-charcoal/80 mb-4 font-inter">
                Our passion for quality poultry breeding has established us as leaders in the industry,
                combining traditional wisdom with modern breeding techniques.
              </p>

              <div className="text-charcoal/80 font-inter leading-relaxed">
                Discover an exceptional collection of carefully bred exotic chicken breeds raised with precision, passion, and purpose.


                <p className="text-charcoal/80 font-inter leading-relaxed mt-4">
                  Our selection includes:
                </p>

                <p className="">
                  <b>Orpingtons</b> - Buff Orpingtons, Frizzle Buff Orpingtons, and Black Orpingtons.
                </p>

                <p className="">
                  <b>Brahmas</b> - Light, Columbian Brahmas, Blue Partridge Brahmas, and Double-Laced Silver Brahmas, Golden Partridge Brahmas.
                </p>

                <p className="">
                  <b>Australorps</b> - Black Australorps and Blue Australorps.
                </p>

                <p className="">
                  <b>Wyandottes</b> - Silver-Laced Wyandottes and Gold-Laced Wyandottes
                </p>
                <p className="">
                  <b>Naked Necks,</b>
                </p>
                <b>Light Sussex</b> and more.
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className=" overflow-hidden">
              <img
                src="/Atomc Chickens Logo @1115 Transparent.png"
                alt="Atomc Chickens Farm"
                className="w-full h-auto object-cover mx-auto max-w-sm"
              />
            </div>
            <h2 className="font-playfair text-4xl font-bold text-charcoal mb-6">Our Promise</h2>
            <p className="text-sm text-charcoal/80 max-w-xl mx-auto font-inter">
              Professional poultry services tailored to your needs
            </p>
            <p className="text-lg  max-w-2xl mx-auto font-inter">
              Choose Atomc Chickens -
              <i>Hatched with Purpose. Breeding Excellence, One Chick at a Time.</i>
            </p>
          </div>


        </div>
      </section>

      {/* Who We Are */}
      <section id="about-us" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="font-playfair text-sm font-semibold text-warmBrown mb-2">WHO WE ARE</div>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-charcoal mb-6">Premier Exotic Poultry Breeding</h2>
              <p className="text-lg text-charcoal/80 mb-6 font-inter">
                At Atomc Chickens, we specialize in the breeding and supply of high-quality exotic chickens, Our birds are suitable for chicken enthusiasts, backyard keepers, and commercial farmers alike. We are committed to raising healthy, resilient, and well cared for birds that thrive in diverse environments.

              </p>

            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://cdn.pixabay.com/photo/2016/11/29/05/25/chicken-1867521_1280.jpg"
                  alt="AtomC_hickens farm"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-cream p-4 rounded-lg shadow-lg hidden md:block">
                <div className="font-bold text-3xl text-warmBrown">10+</div>
                <div className="text-charcoal text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py- bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-charcoal mb-6">Why Choose Atomc Chickens</h2>
            <p className="text-lg text-charcoal/80 max-w-2xl mx-auto font-inter">
              Discover our exceptional collection of heritage chicken breeds
            </p>
          </div>

          <div className="grid gap-8">


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="overflow-hidden hover:shadow-lg transition-all">

                <CardContent className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-charcoal mb-2">Premium Exotic Genetics</h3>
                  <p className="text-charcoal/80 mb-4">We carefully select our breeding stock to produce birds with superior genetics, striking appearance, calm temperament, and reliable productivity.</p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-charcoal mb-2">Healthy, Well-Cared-For Birds</h3>
                  <p className="text-charcoal/80 mb-4">Our chickens are raised in a clean, bio-secure environment, with proper nutrition and veterinary oversight, ensuring strong immunity, vitality, and optimal growth.</p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden hover:shadow-lg transition-all">

                <CardContent className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-charcoal mb-2">Organically and Naturally Reared - From Day-Old to 12 Weeks</h3>
                  <p className="text-charcoal/80 mb-4">We supply birds at every growth stage, from day-old chicks to 12-week-old young stock all raised using natural, organic-aligned practices that promote resilience, strong immunity, and healthy, sustainable growth.</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="overflow-hidden hover:shadow-lg transition-all">

                <CardContent className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-charcoal mb-2">Expert Guidance & Support</h3>
                  <p className="text-charcoal/80 mb-4">We don't just sell birds. We provide practical advice on feeding, housing, and care to help you succeed long after your purchase.</p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden hover:shadow-lg transition-all">

                <CardContent className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-charcoal mb-2">Purpose-Driven Breeding</h3>
                  <p className="text-charcoal/80 mb-4">Every chick is hatched with intention, raised with care, and bred to meet high standards of quality and consistency, reflecting our commitment to excellence and stewardship. Our breeds have consistently fared well at the Zimbabwe International Trade Fair (ZITF), producing exotic championship birds, showcasing the superior genetics and careful breeding that define Atomc Chickens.</p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-charcoal mb-2">Suitable for All Levels</h3>
                  <p className="text-charcoal/80 mb-4">Whether you are a beginner, backyard keeper, show breeder, or commercial farmer, our birds are bred to perform and adapt.</p>
                </CardContent>
              </Card>

            </div>

          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">


            {/* Vision */}
            <div className="bg-cream p-8 rounded-lg animate-fade-in">
              <h2 className="font-playfair text-3xl font-bold text-charcoal mb-6">Our Vision</h2>
              <p className="text-charcoal/80 font-inter leading-relaxed">
                To be a leading indigenous poultry enterprise in Zimbabwe and beyond, renowned for excellence in Exotic and Road Runner Chicken breeding, organic and sustainable farming practices, and the consistent supply of healthy, high-quality birds, while empowering farmers through trusted service, innovation, and integrity.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-cream p-8 rounded-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h2 className="font-playfair text-3xl font-bold text-charcoal mb-6">Our Mission</h2>
              <p className="text-charcoal/80 font-inter leading-relaxed">
                To deliver exceptional, high-quality poultry breeding services by producing rare and superior Road Runner chickens suited for showcasing, meat production, and egg laying, while supporting our customers with expert guidance, reliable service, and long-term partnership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-warmBrown/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-playfair text-3xl font-bold text-charcoal">Our Core Values</h2>
            <div className="mt-8 max-w-2xl mx-auto">
              <p className="text-lg text-charcoal/80 font-inter">
                We value professionalism and honesty as we discharge our duties
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white p-8 rounded-lg shadow-sm animate-fade-in">
              <h3 className="font-playfair text-xl font-semibold text-charcoal mb-4">Professionalism</h3>
              <p className="text-charcoal/80 font-inter">
                We apply best-practice poultry management rooted in knowledge, discipline, and continuous improvement, ensuring high standards across all our operations.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h3 className="font-playfair text-xl font-semibold text-charcoal mb-4">Integrity & Honesty</h3>
              <p className="text-charcoal/80 font-inter">
                We uphold transparency and ethical conduct in our breeding methods, customer relationships, and business practices, building trust through honest and responsible farming.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white p-8 rounded-lg shadow-sm animate-fade-in">
              <h3 className="font-playfair text-xl font-semibold text-charcoal mb-4">Organic & Natural Rearing</h3>
              <p className="text-charcoal/80 font-inter">
                We prioritize natural, organic-aligned rearing practices that promote strong immunity, natural growth, and resilience while minimizing unnecessary chemical interventions.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h3 className="font-playfair text-xl font-semibold text-charcoal mb-4">Animal Welfare & Responsible Care</h3>
              <p className="text-charcoal/80 font-inter">
                We are committed to humane, stress-free handling, clean housing, and proper nutrition, recognizing that healthy birds are the foundation of sustainable poultry farming.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white p-8 rounded-lg shadow-sm animate-fade-in">
              <h3 className="font-playfair text-xl font-semibold text-charcoal mb-4">Sustainability & Environmental Stewardship</h3>
              <p className="text-charcoal/80 font-inter">
                We embrace environmentally responsible practices that conserve resources, reduce waste, and support long-term agricultural sustainability for future generations.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h3 className="font-playfair text-xl font-semibold text-charcoal mb-4">Customer Partnership</h3>
              <p className="text-charcoal/80 font-inter">
                We walk alongside our customers by sharing knowledge, best practices, and support, empowering them to succeed in ethical and sustainable poultry production.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-3xl font-bold text-charcoal mb-6">Ready to Start Your Journey?</h2>
          <p className="text-lg text-charcoal/80 mb-8 max-w-2xl mx-auto font-inter">
            Join us in our mission to provide the finest roadrunner chickens in Zimbabwe.
          </p>

          <Link to="/contact">
            <Button className="bg-warmBrown hover:bg-warmBrown/90 text-white font-inter">
              Contact Us Today
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
