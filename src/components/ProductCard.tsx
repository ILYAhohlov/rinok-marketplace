import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../types';
import '../styles/components.css';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity?: number) => void;
  onProductClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onProductClick }) => {
  return (
    <div className="card product-card"
      onClick={() => onProductClick(product)}

    >
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name}
          className="product-image"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=200&fit=crop';
          }}
        />
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            border: 'none',
            background: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <Plus size={24} color="#8b4513" strokeWidth={3} />
        </button>
      </div>

      <div style={{ marginBottom: '8px' }}>
        <span style={{ 
          fontSize: '18px', 
          fontWeight: '700',
          color: '#38b2ac'
        }}>
          {product.price} ₽
        </span>
      </div>

      <div>
        <h3 style={{ 
          fontSize: '16px', 
          fontWeight: '600',
          lineHeight: '1.3',
          margin: 0
        }}>
          {product.name}
        </h3>
      </div>
    </div>
  );
};

export default ProductCard;