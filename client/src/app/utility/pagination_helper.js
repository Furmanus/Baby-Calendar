import React from 'react';
import {
    Pagination
} from 'react-bootstrap';

export function getPaginationItem(index, currentIndex, onClick) {
    return (
        <Pagination.Item
            active={index === currentIndex}
            onClick={onClick}
            key={index}
        >
            {index}
        </Pagination.Item>
    );
}