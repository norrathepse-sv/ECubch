<template>
  <div class="relative w-full ">
    

<div class="relative bg-navy text-white min-h-[200px] md:min-h-[600px] flex items-center justify-center overflow-hidden pt-0">
      
      <video 
        autoplay 
        loop 
        muted 
        playsinline
        class="absolute w-full h-full object-cover object-center z-0 animate-fade-in"
      >
        <source src="/Videos/footage3.mp4" type="video/mp4" />
      </video>
      
      <div class="absolute inset-0 bg-navy/75 mix-blend-multiply z-10"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-transparent to-navy-dark/30 z-10"></div>

      <div class="absolute top-0 left-0 p-6 z-20">
        <img src="/images/logoUBCH.png" alt="UBCH Logo" class="w-[80px] md:w-[120px] h-auto" />
      </div>

</div>
    
  </div>
</template>