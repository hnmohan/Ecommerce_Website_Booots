document.addEventListener('DOMContentLoaded', function() {
    // Navigation Active Class Handling
    const navItems = document.querySelectorAll('#navbar li a');

    navItems.forEach(navItem => {
        navItem.addEventListener('click', function(e) {
            // Prevent default behavior of anchor links
            e.preventDefault();

            // Remove the 'active' class from all nav items
            navItems.forEach(item => item.classList.remove('active'));

            // Add the 'active' class to the clicked nav item
            this.classList.add('active');

            // Optional: Scroll to the section if needed
            const targetId = this.getAttribute('href'); // Get the href value (e.g., #hero, #featured_products)
            const targetSection = document.querySelector(targetId); // Find the corresponding section
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the section
            }
        });
    });

    // Cart Modal Handling
    const cartModal = document.getElementById('cart-modal');
    const cartIcon = document.querySelector('a[href="#cart-modal"]');
    const closeModal = document.querySelector('.close');

    // Open modal
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        cartModal.style.display = 'block';
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if(e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Newsletter Form Validation
    const newsletterForm = document.querySelector('#newsletter form');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = document.querySelector('#newsletter input[type="email"]');
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            alert('Please enter your email address.');
            return;
        }

        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address (e.g., name@example.com).');
            return;
        }

        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    });

    // Contact Form Validation
    const contactForm = document.querySelector('#contact form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.querySelector('#contact input[type="text"]').value.trim();
        const email = document.querySelector('#contact input[type="email"]').value.trim();
        const message = document.querySelector('#contact textarea').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validation checks
        if (!name) {
            alert('Please enter your name.');
            return;
        }

        if (!email) {
            alert('Please enter your email address.');
            return;
        }

        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address (e.g., name@example.com).');
            return;
        }

        if (!message) {
            alert('Please enter your message.');
            return;
        }

        // If all validations pass
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });

    // Cart Management
    let cart = [];

    // Add to Cart
    function addToCart(product) {
        const productName = product.querySelector('h5').textContent;
        const productPrice = parseFloat(product.querySelector('h4').textContent.replace('Rs. ', '').replace(',', ''));

        // Check if the product already exists in the cart
        const existingItem = cart.find(item => item.name === productName);

        if (existingItem) {
            // If it exists, increase the quantity
            existingItem.quantity += 1;
        } else {
            // If it doesn't exist, add it to the cart
            cart.push({
                name: productName,
                price: productPrice,
                quantity: 1
            });
        }

        // Show alert when product is added to cart
        alert(`${productName} has been added to your cart!`);
        updateCartDisplay();
    }

    // Update Cart Display
    function updateCartDisplay() {
        const cartItems = document.getElementById('cart-items');
        cartItems.innerHTML = '';
        
        cart.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <div>
                    <h4>${item.name}</h4>
                    <p>Rs. ${item.price.toLocaleString()}</p>
                </div>
                <div>
                    <span>Qty: ${item.quantity}</span>
                    <button class="increase-qty" data-index="${index}">+</button>
                    <button class="delete-item" data-index="${index}">Delete</button>
                </div>
            `;
            cartItems.appendChild(div);
        });

        // Add event listeners for delete and increase quantity buttons
        document.querySelectorAll('.delete-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                deleteItemFromCart(index);
            });
        });

        document.querySelectorAll('.increase-qty').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                increaseQuantity(index);
            });
        });
    }

    // Delete Item from Cart
    function deleteItemFromCart(index) {
        const itemName = cart[index].name; // Get the name of the item being deleted
        cart.splice(index, 1); // Remove the item at the specified index
        alert(`${itemName} has been removed from your cart.`);
        updateCartDisplay();
    }

    // Increase Quantity of an Item
    function increaseQuantity(index) {
        cart[index].quantity += 1; // Increase the quantity of the item at the specified index
        updateCartDisplay();
    }

    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll('.cart-btn').forEach(button => {
        button.addEventListener('click', () => {
            const product = button.closest('.product');
            addToCart(product);
        });
    });

    // Clear Cart
    document.getElementById('clear-cart').addEventListener('click', () => {
        cart = [];
        alert('Your cart has been cleared.');
        updateCartDisplay();
    });

    // Purchase
    document.getElementById('purchase').addEventListener('click', () => {
        if(cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        alert('Thank you for your purchase!');
        cart = [];
        updateCartDisplay();
        cartModal.style.display = 'none';
    });
});