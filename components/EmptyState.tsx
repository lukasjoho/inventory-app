import React from 'react';

const EmptyState = () => {
  return (
    <div className="flex w-full flex-col items-center gap-2 py-8">
      <h2 className="text-center text-sm">
        No products available for given search query.
      </h2>
      <img
        className="w-[300px] overflow-hidden rounded-md"
        src="https://media0.giphy.com/media/2vs70gBAfQXvOOYsBI/giphy.gif"
        alt=""
      />
    </div>
  );
};

export default EmptyState;
