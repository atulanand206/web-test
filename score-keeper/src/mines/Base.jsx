let Base = {
    mine : '?',
    empty : ' ',
    flag : '@',
    row : 20,
    col : 20,
    mines : 50,
    directions: [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]],
    numbers: /^[0-9]+$/
};

export default Base;