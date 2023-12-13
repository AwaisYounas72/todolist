import React from 'react'
 
function FooterBar() {
  return (
   
<div className='bottom-0 fixed w-full'> 
<footer class="bg-white   shadow   dark:bg-gray-800">
    <div class="w-full mx-auto flex flex-col items-center  p-4 md:flex md:flex-row md:items-center md:justify-between">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a>. All Rights Reserved.
    </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
            <span href="#" class="hover:underline me-4 md:me-6">About</span>
        </li>
        <li>
            <span href="#" class="hover:underline me-4 md:me-6">Privacy Policy</span>
        </li>
        <li>
            <span href="#" class="hover:underline me-4 md:me-6">Licensing</span>
        </li>
        <li>
            <span href="#" class="hover:underline">Contact</span>
        </li>
    </ul>
    </div>
</footer>
</div>
);
  
}

export default FooterBar