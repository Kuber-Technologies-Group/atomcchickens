import React from "react";

const BlogHeader = () => (
  <div className="relative pt-32 bg-cream">
    <div className="absolute inset-0 bg-[url('https://cdn.pixabay.com/photo/2022/05/07/21/55/bird-7181022_1280.jpg')] bg-cover bg-center bg-no-repeat opacity-20" />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center">
        <h1 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal mb-6">Our Blog</h1>
        <p className="text-lg text-charcoal/80 max-w-2xl mx-auto font-inter">
          Insights and updates from the world of indigenous poultry farming
        </p>
      </div>
    </div>
  </div>
);

export default BlogHeader;
