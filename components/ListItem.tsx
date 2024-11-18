// components/ItemList.tsx
import React from 'react';
import Link from 'next/link';

interface Item {
  name: string;
  url: string;
}

interface ItemListProps {
  items: Item[];
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  return (
    <div className="item-list">
      {items?.map((item) => (
        <div key={item.name} className="item-card">
          <Link href={`/details/${item.name}`}>
            {item.name}
          </Link>
        </div>
      ))}
      
      <style jsx>{`
        .item-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
          padding: 20px;
        }

        .item-card {
          background-color: #f0f0f0;
          padding: 15px;
          text-align: center;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .item-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default ItemList;
