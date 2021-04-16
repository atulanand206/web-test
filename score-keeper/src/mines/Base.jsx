let Base = {
    mine : '?',
    empty : ' ',
    flag : '@',
    row : 10,
    col : 10,
    mines : 40,
    directions: [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]],
    numbers: /^[0-9]+$/,
    configs: [
        { row: 10, col: 10, mines: 10, name: 'Beginner', color: '#0a6c03', darker: '#064003' },
        { row: 10, col: 10, mines: 20, name: 'Intermediate', color: '#1B73D3', darker: '#0e549e' },
        { row: 20, col: 20, mines: 60, name: 'Advanced', color: '#CC2936', darker: '#941621' },
        { row: 30, col: 30, mines: 100, name: 'Expert', color: '#000', darker: '#614343' },
    ]
};

export default Base;