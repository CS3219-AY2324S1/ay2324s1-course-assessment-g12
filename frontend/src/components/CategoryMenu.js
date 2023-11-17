import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const categories = [
  'array',
  'hash table',
  'linked list',
  'math',
  'recursion',
  'string',
  'sliding window',
  'binary search',
  'divide and conquer',
  'dynamic programming',
  'two pointers',
  'greedy',
  'trie',
  'sorting',
  'backtracking',
  'stack',
  'heap (priority queue)',
  'merge sort',
  'string matching',
  'bit manipulation',
  'matrix',
  'monotonic stack',
  'simulation',
  'combinatorics',
  'memoization',
  'tree',
  'depth-first search',
  'binary tree',
  'binary search tree',
  'breadth-first search',
  'union find',
  'graph',
  'design',
  'doubly-linked list',
  'geometry',
  'interactive',
  'bucket sort',
  'radix sort',
  'counting',
  'data stream',
  'iterator',
  'database',
  'rolling hash',
  'hash function',
  'shell',
  'enumeration',
  'number theory',
  'topological sort',
  'prefix sum',
  'quickselect',
  'binary indexed tree',
  'segment tree',
  'line sweep',
  'ordered set',
  'queue',
  'monotonic queue',
  'counting sort',
  'brainteaser',
  'game theory',
  'eulerian circuit',
  'randomized',
  'reservoir sampling',
  'shortest path',
  'bitmask',
  'rejection sampling',
  'probability and statistics',
  'suffix array',
  'concurrency',
  'minimum spanning tree',
  'biconnected component',
  'strongly connected component'
]

export default function CategoryMenu({selectedCategory, onCategoryChange}) {
  const [categoryName, setCategoryName] = React.useState([]);

  const handleMenuItemClick = (category) => {
    onCategoryChange(category);
  }; 

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategoryName((prevCategoryName) => {
      const newValue = typeof value === 'string' ? value.split(',') : value;
      onCategoryChange(newValue);
      return newValue;
    });
  };

  return (
    <div>
      <FormControl
        sx={{
          m: 0,
          width: 300,
          // Add custom styling here
          backgroundColor: '#166AC5', // Set the background color to purple
          color: 'white', // Set the text color to white
          borderRadius: '5px', // Add rounded corners
        }}
      >
        <InputLabel id="demo-multiple-checkbox-label" 
        sx={{ 
          color: 'white', 
          //transform: 'translate(14px, 10px) scale(1)' // Move label to top
          }}
          >ALL TOPICS</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={categoryName}
          onChange={handleChange}
          input={<OutlinedInput label="Category" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          sx={{
            height: '38px', // Set the height to 40px (adjust as needed)
          }}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              <Checkbox checked={categoryName.indexOf(category) > -1} />
              <ListItemText primary={category} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}