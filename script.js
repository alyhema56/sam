 // ===== GOOGLE ANALYTICS =====
        // Google Analytics (GA4)
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXXXXX'); // Remplacez par votre ID Google Analytics

        // ===== GLOBAL VARIABLES =====
        let deferredPrompt;
        let products = [];
        let currentOrder = null;
        let cart = [];
        let currentTestimonial = 0;

        // ===== PRODUCTS DATA =====
        const productsData = [
            {
                id: 1,
                name: "iPhone 14 Pro Max",
                category: "telephone",
                subcategory: "Apple",
                description: "Reconditionné garanti 12 mois, écran 6.7\", 256 Go",
                price: 450000,
                oldPrice: 520000,
                image: "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-Pro-iPhone-14-Pro-Max-silver-220907-geo_inline.jpg.large.jpg",
                badge: "Nouveau",
                stock: 5
            },
            {
                id: 2,
                name: "Infinix Hot 30",
                category: "telephone",
                subcategory: "Infinix",
                description: "Neuf sous boîte, 6.78\", 8 Go RAM, 128 Go",
                price: 125000,
                oldPrice: 145000,
                image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                badge: "Promo",
                stock: 12
            },
            {
                id: 3,
                name: "Samsung Galaxy A54",
                category: "telephone",
                subcategory: "Samsung",
                description: "Neuf, écran Super AMOLED, 128 Go, 50 MP",
                price: 180000,
                oldPrice: 0,
                image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                badge: "",
                stock: 8
            },
            {
                id: 4,
                name: "Radio Portable Sony",
                category: "radio",
                subcategory: "Audio",
                description: "FM/AM avec Bluetooth, batterie longue durée",
                price: 25000,
                oldPrice: 32000,
                image: "https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                badge: "Promo",
                stock: 15
            },
            {
                id: 5,
                name: "Écouteurs Bluetooth",
                category: "accessory",
                subcategory: "Audio",
                description: "Sans fil, autonomie 20h, étanches",
                price: 15000,
                oldPrice: 20000,
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                badge: "Promo",
                stock: 20
            },
            {
                id: 6,
                name: "Chargeur Rapide",
                category: "accessory",
                subcategory: "Power",
                description: "Charge rapide 30W, compatible iPhone/Android",
                price: 8000,
                oldPrice: 12000,
                image: "https://images.unsplash.com/photo-1600003263720-95b45a4035d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                badge: "",
                stock: 30
            }
        ];

        // ===== TESTIMONIALS DATA =====
        const testimonialsData = [
            {
                id: 1,
                name: "Fatoumata S.",
                role: "Commerçante",
                text: "Mon iPhone a été réparé en moins de 2 heures ! Service rapide et professionnel. Je recommande Samservice à tous à Banfora.",
                rating: 5,
                avatar: "F"
            },
            {
                id: 2,
                name: "Abdoulaye K.",
                role: "Étudiant",
                text: "J'ai acheté mon premier téléphone chez Samservice. Le prix était correct et le service après-vente est excellent. Merci !",
                rating: 5,
                avatar: "A"
            },
            {
                id: 3,
                name: "Mariam D.",
                role: "Infirmière",
                text: "La batterie de mon Samsung ne tenait plus. Samservice l'a remplacée rapidement et à un prix très abordable. Satisfaite à 100%.",
                rating: 4,
                avatar: "M"
            },
            {
                id: 4,
                name: "Boubacar T.",
                role: "Agriculteur",
                text: "J'ai acheté une radio portable pour le champ. Qualité sonore exceptionnelle et autonomie incroyable. Livraison rapide à domicile.",
                rating: 5,
                avatar: "B"
            }
        ];

        // ===== LOADING MANAGEMENT =====
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loadingScreen').classList.add('hidden');
                initApp();
                
                // Track page view
                trackEvent('page_view', 'home');
            }, 1000);
        });

        // ===== ANALYTICS FUNCTIONS =====
        function trackEvent(eventName, eventCategory, eventLabel = null, eventValue = null) {
            if (typeof gtag !== 'undefined') {
                gtag('event', eventName, {
                    'event_category': eventCategory,
                    'event_label': eventLabel,
                    'value': eventValue
                });
            }
            
            // Console log pour le debug
            console.log(`Event tracked: ${eventName} - ${eventCategory}`);
        }

        // ===== APP INITIALIZATION =====
        function initApp() {
            products = productsData;
            
            // Initialize components
            initProducts();
            initFilters();
            initTestimonials();
            initOrderForm();
            initScrollAnimations();
            initMobileMenu();
            loadCart();
            updateOpeningStatus();
            
            // Check for PWA install
            initPWA();
            
            // Set up intervals
            setInterval(updateOpeningStatus, 30000);
            
            // Track app initialized
            trackEvent('app_initialized', 'engagement');
        }

        // ===== PRODUCTS MANAGEMENT =====
        function initProducts() {
            const productsGrid = document.getElementById('productsGrid');
            const productSelect = document.getElementById('orderProduct');
            
            // Clear existing
            productsGrid.innerHTML = '';
            productSelect.innerHTML = '<option value="">Sélectionnez un produit</option>';
            
            // Add products to grid and select
            products.forEach(product => {
                // Add to products grid
                productsGrid.appendChild(createProductCard(product));
                
                // Add to order select
                const option = document.createElement('option');
                option.value = product.id;
                option.textContent = `${product.name} - ${formatPrice(product.price)}`;
                productSelect.appendChild(option);
            });
            
            // Track products loaded
            trackEvent('products_loaded', 'engagement', null, products.length);
        }

        function createProductCard(product) {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.dataset.category = product.category;
            
            let badgeHTML = '';
            if (product.badge) {
                badgeHTML = `<div class="product-badge">${product.badge}</div>`;
            }
            
            let oldPriceHTML = '';
            if (product.oldPrice > 0) {
                oldPriceHTML = `<span class="old-price">${formatPrice(product.oldPrice)}</span>`;
            }
            
            let stockHTML = '';
            if (product.stock < 3) {
                stockHTML = `<p style="color: #e74c3c; font-size: 0.9rem; margin: 5px 0;"><i class="fas fa-exclamation-triangle"></i> Plus que ${product.stock} en stock !</p>`;
            }
            
            card.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    ${badgeHTML}
                </div>
                <div class="product-info">
                    <div class="product-category">${product.subcategory}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <p style="font-size: 0.9rem; color: #666; margin-bottom: 10px;">${product.description}</p>
                    ${stockHTML}
                    <div class="product-price">
                        <span class="current-price">${formatPrice(product.price)}</span>
                        ${oldPriceHTML}
                    </div>
                    <div class="product-actions">
                        <button class="btn-order" onclick="addToCart(${product.id})" aria-label="Ajouter ${product.name} au panier">
                            <i class="fas fa-cart-plus"></i> Ajouter
                        </button>
                    </div>
                </div>
            `;
            
            return card;
        }

        // ===== PANIER FUNCTIONS =====
        function loadCart() {
            const savedCart = localStorage.getItem('samservice_cart');
            if (savedCart) {
                cart = JSON.parse(savedCart);
                updateCartUI();
            }
        }

        function saveCart() {
            localStorage.setItem('samservice_cart', JSON.stringify(cart));
        }

        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            if (!product) return;
            
            // Vérifier le stock
            if (product.stock <= 0) {
                alert('Désolé, ce produit est en rupture de stock.');
                return;
            }
            
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                if (existingItem.quantity < product.stock) {
                    existingItem.quantity += 1;
                } else {
                    alert(`Stock limité : seulement ${product.stock} unités disponibles.`);
                    return;
                }
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    image: product.image
                });
            }
            
            saveCart();
            updateCartUI();
            
            // Show notification
            showNotification(`${product.name} ajouté au panier !`);
            
            // Track add to cart
            trackEvent('add_to_cart', 'ecommerce', product.name, product.price);
        }

        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            saveCart();
            updateCartUI();
            
            trackEvent('remove_from_cart', 'ecommerce');
        }

        function updateCartUI() {
            const cartItems = document.getElementById('cartItems');
            const cartCount = document.getElementById('cartCount');
            const cartTotalPrice = document.getElementById('cartTotalPrice');
            
            // Calculer le total
            let total = 0;
            let count = 0;
            
            cartItems.innerHTML = '';
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                count += item.quantity;
                
                const itemDiv = document.createElement('div');
                itemDiv.className = 'cart-item';
                itemDiv.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <img src="${item.image}" alt="${item.name}" style="width: 40px; height: 40px; border-radius: 5px; object-fit: cover;">
                        <div>
                            <p style="margin: 0; font-weight: 600; font-size: 0.9rem;">${item.name}</p>
                            <p style="margin: 0; color: #666; font-size: 0.8rem;">${formatPrice(item.price)} × ${item.quantity}</p>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-weight: 600;">${formatPrice(itemTotal)}</span>
                        <button onclick="removeFromCart(${item.id})" style="background: none; border: none; color: #e74c3c; cursor: pointer;" aria-label="Supprimer">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                cartItems.appendChild(itemDiv);
            });
            
            // Mettre à jour les compteurs
            cartCount.textContent = count;
            cartTotalPrice.textContent = total.toLocaleString();
            
            // Afficher le total si le panier n'est pas vide
            if (cart.length > 0) {
                const totalDiv = document.createElement('div');
                totalDiv.className = 'cart-total';
                totalDiv.innerHTML = `Total: ${formatPrice(total)}`;
                cartItems.appendChild(totalDiv);
            } else {
                cartItems.innerHTML = '<p style="text-align: center; color: #666;">Votre panier est vide</p>';
            }
        }

        function toggleCart() {
            const cartContainer = document.getElementById('cartContainer');
            cartContainer.classList.toggle('show');
            
            if (cartContainer.classList.contains('show')) {
                trackEvent('cart_opened', 'ecommerce', null, cart.length);
            }
        }

        function checkoutFromCart() {
            if (cart.length === 0) {
                alert('Votre panier est vide !');
                return;
            }
            
            // Scroll to order section
            scrollToSection('order');
            
            // Pré-remplir le formulaire avec le premier produit
            if (cart.length > 0) {
                document.getElementById('orderProduct').value = cart[0].id;
                document.getElementById('orderQuantity').value = cart[0].quantity;
            }
            
            // Fermer le panier
            toggleCart();
            
            // Focus sur le nom
            document.getElementById('orderName').focus();
            
            trackEvent('checkout_initiated', 'ecommerce', null, cart.length);
        }

        // ===== FILTERS SYSTEM =====
        function initFilters() {
            const filterButtons = document.querySelectorAll('.filter-btn');
            
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Update active button
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    
                    // Filter products
                    const filter = button.dataset.filter;
                    filterProducts(filter);
                    
                    // Track filter usage
                    trackEvent('filter_products', 'engagement', filter);
                });
            });
        }

        function filterProducts(category) {
            const productCards = document.querySelectorAll('.product-card');
            
            productCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        }

        // ===== TESTIMONIALS SYSTEM =====
        function initTestimonials() {
            const track = document.getElementById('testimonialsTrack');
            
            testimonialsData.forEach(testimonial => {
                const testimonialCard = document.createElement('div');
                testimonialCard.className = 'testimonial-card';
                
                // Générer les étoiles
                let stars = '';
                for (let i = 0; i < 5; i++) {
                    if (i < testimonial.rating) {
                        stars += '<i class="fas fa-star"></i>';
                    } else {
                        stars += '<i class="far fa-star"></i>';
                    }
                }
                
                testimonialCard.innerHTML = `
                    <div class="testimonial-avatar">
                        <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #3498db; color: white; font-size: 2rem;">
                            ${testimonial.avatar}
                        </div>
                    </div>
                    <div class="testimonial-rating">
                        ${stars}
                    </div>
                    <p class="testimonial-text">"${testimonial.text}"</p>
                    <p class="testimonial-author">${testimonial.name}</p>
                    <p style="color: #666; font-size: 0.9rem; margin-top: 5px;">${testimonial.role}</p>
                `;
                
                track.appendChild(testimonialCard);
            });
        }

        function nextTestimonial() {
            const track = document.getElementById('testimonialsTrack');
            currentTestimonial = (currentTestimonial + 1) % testimonialsData.length;
            track.style.transform = `translateX(-${currentTestimonial * 100}%)`;
        }

        function prevTestimonial() {
            const track = document.getElementById('testimonialsTrack');
            currentTestimonial = (currentTestimonial - 1 + testimonialsData.length) % testimonialsData.length;
            track.style.transform = `translateX(-${currentTestimonial * 100}%)`;
        }

        // ===== ORDER MANAGEMENT =====
        function initOrderForm() {
            const form = document.getElementById('orderForm');
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                generateWhatsAppOrder();
            });
        }

        function generateWhatsAppOrder() {
            const name = document.getElementById('orderName').value;
            const phone = document.getElementById('orderPhone').value;
            const productId = parseInt(document.getElementById('orderProduct').value);
            const quantity = parseInt(document.getElementById('orderQuantity').value) || 1;
            const message = document.getElementById('orderMessage').value;
            
            // Validation
            if (!validatePhone(phone)) {
                alert('Veuillez entrer un numéro valide (ex: +226 XX XX XX XX)');
                return;
            }
            
            const product = products.find(p => p.id === productId);
            if (!product) {
                alert('Veuillez sélectionner un produit');
                return;
            }
            
            // Vérifier le stock
            if (quantity > product.stock) {
                alert(`Désolé, seulement ${product.stock} unités disponibles pour ce produit.`);
                return;
            }
            
            // Store order data
            currentOrder = {
                name,
                phone,
                product,
                quantity,
                message,
                date: new Date().toLocaleString('fr-FR')
            };
            
            // Generate WhatsApp message
            const whatsappMessage = generateOrderMessage(currentOrder);
            
            // Show preview
            document.getElementById('whatsappMessage').textContent = whatsappMessage;
            document.getElementById('whatsappPreview').classList.add('show');
            
            // Scroll to preview
            document.getElementById('whatsappPreview').scrollIntoView({ behavior: 'smooth' });
            
            // Track order generated
            trackEvent('order_generated', 'ecommerce', product.name, product.price * quantity);
        }

        function generateOrderMessage(order) {
            const total = order.product.price * order.quantity;
            const orderId = 'CMD-' + Date.now().toString().slice(-8);
            
            return `🛒 *NOUVELLE COMMANDE SAMSERVICE* (${orderId})

👤 *CLIENT:*
• Nom: ${order.name}
• Téléphone: ${order.phone}
• Date: ${order.date}

📦 *DÉTAILS DE LA COMMANDE:*
• Produit: ${order.product.name}
• Catégorie: ${order.product.subcategory}
• Quantité: ${order.quantity}
• Prix unitaire: ${formatPrice(order.product.price)}
• Prix total: ${formatPrice(total)}
${order.product.oldPrice > 0 ? `• Économie réalisée: ${formatPrice(order.product.oldPrice * order.quantity - total)}` : ''}

📝 *INFORMATIONS SUPPLÉMENTAIRES:*
• Site web: Samservice Banfora
• ID Commande: ${orderId}
• Heure: ${new Date().toLocaleTimeString('fr-FR')}
• Statut: En attente de confirmation

💬 *MESSAGE DU CLIENT:*
${order.message || 'Aucun message supplémentaire'}

📍 *LIVRAISON:*
• Zone: Banfora
• Frais: Gratuits
• Délai estimé: 2-4 heures
• Adresse: À confirmer par téléphone

📞 *CONTACT:*
• WhatsApp: +226 56 32 30 77
• Propriétaire: Traoré Samba
• Horaires: 8h - 22h (7j/7)

Merci pour votre confiance ! 🚀`;
        }

        function sendWhatsApp() {
            if (!currentOrder) return;
            
            const message = encodeURIComponent(generateOrderMessage(currentOrder));
            const phone = '22656323077';
            const url = `https://wa.me/${phone}?text=${message}`;
            
            // Track order sent
            trackEvent('order_sent', 'ecommerce', currentOrder.product.name, currentOrder.product.price * currentOrder.quantity);
            
            window.open(url, '_blank');
            
            // Reset form
            document.getElementById('orderForm').reset();
            document.getElementById('whatsappPreview').classList.remove('show');
            
            // Vider le panier si la commande vient du panier
            if (cart.length > 0) {
                cart = [];
                saveCart();
                updateCartUI();
            }
            
            currentOrder = null;
            
            // Show confirmation
            showNotification('Commande envoyée ! Vous allez être redirigé vers WhatsApp.');
        }

        // ===== NOTIFICATION SYSTEM =====
        function showNotification(message) {
            // Créer la notification
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--success-color);
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                box-shadow: var(--shadow);
                z-index: 10000;
                transform: translateX(100%);
                opacity: 0;
                transition: transform 0.3s ease, opacity 0.3s ease;
                max-width: 300px;
            `;
            notification.textContent = message;
            notification.setAttribute('role', 'alert');
            
            document.body.appendChild(notification);
            
            // Animation d'entrée
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
                notification.style.opacity = '1';
            }, 10);
            
            // Supprimer après 3 secondes
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                notification.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        }

        // ===== SCROLL ANIMATIONS =====
        function initScrollAnimations() {
            const sections = document.querySelectorAll('.section');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        
                        // Track section view
                        const sectionId = entry.target.id;
                        trackEvent('section_view', 'engagement', sectionId);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            });
            
            sections.forEach(section => {
                observer.observe(section);
            });
        }

        function scrollToSection(sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
                const headerHeight = document.querySelector('header').offsetHeight;
                window.scrollTo({
                    top: section.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
                
                // Track scroll to section
                trackEvent('scroll_to_section', 'navigation', sectionId);
            }
        }

        // ===== MOBILE MENU =====
        function initMobileMenu() {
            const menuBtn = document.getElementById('mobileMenuBtn');
            const navContainer = document.getElementById('navContainer');
            
            menuBtn.addEventListener('click', () => {
                const isExpanded = navContainer.classList.contains('active');
                navContainer.classList.toggle('active');
                menuBtn.setAttribute('aria-expanded', !isExpanded);
                menuBtn.innerHTML = navContainer.classList.contains('active') 
                    ? '<i class="fas fa-times"></i>' 
                    : '<i class="fas fa-bars"></i>';
                    
                // Track menu toggle
                trackEvent('menu_toggle', 'navigation', isExpanded ? 'close' : 'open');
            });
            
            // Close menu when clicking on a link
            document.querySelectorAll('nav a').forEach(link => {
                link.addEventListener('click', () => {
                    navContainer.classList.remove('active');
                    menuBtn.setAttribute('aria-expanded', 'false');
                    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                });
            });
        }

        // ===== PWA FUNCTIONALITY =====
        function initPWA() {
            // Listen for beforeinstallprompt event
            window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                deferredPrompt = e;
                
                // Show install prompt after 5 seconds
                setTimeout(() => {
                    if (deferredPrompt && isMobile()) {
                        document.getElementById('pwaInstall').classList.add('show');
                    }
                }, 5000);
            });
            
            // Listen for app installed event
            window.addEventListener('appinstalled', () => {
                document.getElementById('pwaInstall').classList.remove('show');
                deferredPrompt = null;
                
                // Track PWA install
                trackEvent('pwa_installed', 'engagement');
            });
        }

        function installPWA() {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted PWA installation');
                        trackEvent('pwa_install_accepted', 'engagement');
                    } else {
                        trackEvent('pwa_install_declined', 'engagement');
                    }
                    deferredPrompt = null;
                });
            }
        }

        function closePWA() {
            document.getElementById('pwaInstall').classList.remove('show');
            trackEvent('pwa_prompt_closed', 'engagement');
        }

        function isMobile() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        }

        // ===== UTILITY FUNCTIONS =====
        function formatPrice(price) {
            return new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'XOF',
                minimumFractionDigits: 0
            }).format(price);
        }

        function validatePhone(phone) {
            const cleaned = phone.replace(/\s/g, '');
            const regex = /^(\+226|226|0)[0-9]{8}$/;
            return regex.test(cleaned);
        }

        function updateOpeningStatus() {
            const now = new Date();
            const hour = now.getHours();
            const day = now.getDay();
            
            // Business hours: Mon-Sun 8h-22h
            const isOpen = (day >= 1 && day <= 7) && (hour >= 8 && hour < 22);
            
            const statusElement = document.getElementById('headerStatus');
            const statusText = document.getElementById('statusText');
            
            if (isOpen) {
                statusElement.classList.remove('closed');
                statusText.textContent = 'OUVERT';
            } else {
                statusElement.classList.add('closed');
                statusText.textContent = 'FERMÉ';
            }
        }

        // ===== LAZY LOADING =====
        function lazyLoadImages() {
            const images = document.querySelectorAll('img[loading="lazy"]');
            
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }

        // Initialize lazy loading
        document.addEventListener('DOMContentLoaded', lazyLoadImages);

        // ===== SERVICE WORKER REGISTRATION =====
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').then(registration => {
                    console.log('ServiceWorker registration successful');
                }).catch(err => {
                    console.log('ServiceWorker registration failed: ', err);
                });
            });
        }

    </script>

