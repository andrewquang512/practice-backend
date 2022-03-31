let data = [];

let input = document.querySelector('input');

input.addEventListener('change', () => {
  let files = input.files;
  if (files.length == 0) return;
  const file = files[0];

  let reader = new FileReader();

  reader.onload = (e) => {
    const file = e.target.result;
    data = file;
    try {
      data = JSON.parse(data);
      TreeGenerate(data);
    } catch (error) {
      alert('This is not a Valid JSON File');
    }
  };

  reader.onerror = (e) => alert(e.target.error.name);

  reader.readAsText(file);
});

const TreeGenerate = (data) => {
  d3.select('svg').remove();

  var svg = d3
    .select('main')
    .append('svg')
    .attr('width', 1200)
    .attr('height', 800)
    .append('g')
    .attr('transform', 'translate(0,-200)');

  data.forEach(function (d) {
    d.parentId = d.parents.length > 0 ? d.parents[0] : 'root';
  });
  data.unshift({ child: 'root', parentId: '' });

  //to construct
  var dataStructure = d3
    .stratify()
    .id(function (d) {
      return d.child;
    })
    .parentId(function (d) {
      return d.parentId;
    })(data);

  //to define the size of the structure tree
  var treeStructure = d3.tree().size([1200, 800]);
  var root = treeStructure(dataStructure);

  var nodes = root.descendants().filter(function (d) {
    return d.id !== 'root';
  });

  // Custom way to get all links we need to draw
  var links = [];
  nodes.forEach(function (node) {
    node.data.parents.forEach(function (parentId) {
      var parentNode = nodes.find(function (d) {
        return d.id === parentId;
      });
      links.push({
        source: parentNode,
        target: node,
      });
    });
  });

  //to make the connections curves
  var connections = svg.append('g').selectAll('path').data(links);
  connections
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('d', function (d) {
      return (
        'M' +
        d.source.x +
        ',' +
        d.source.y +
        ' C ' +
        d.source.x +
        ',' +
        d.source.y +
        ' ' +
        d.target.x +
        ',' +
        d.target.y +
        ' ' +
        d.target.x +
        ',' +
        d.target.y
      );
    });
  //creating the rectangle with data info
  var rectangle = svg
    .append('g')
    .selectAll('rect')
    .data(nodes)
    .enter()
    .append('rect')
    .attr('class', 'node')
    .attr('x', function (d) {
      return d.x - 70;
    })
    .attr('y', function (d) {
      return d.y - 40;
    })
    .attr('width', 150)
    .attr('height', 40)
    .attr('stroke', 'black')
    .attr('fill', '#FFFFFF')
    .append('text');

  //names
  var names = svg.append('g').selectAll('text').data(nodes);
  names
    .enter()
    .append('text')
    .text(function (d) {
      return d.id;
    })
    .attr('x', function (d) {
      return d.x - 60;
    })
    .attr('y', function (d) {
      return d.y - 15;
    });
};

const textareaHandle = () => {
  let textarea = document.querySelector('textarea');
  data = textarea.value;
  try {
    data = JSON.parse(data);
    TreeGenerate(data);
  } catch (error) {
    alert('This is not a Valid JSON File');
  }
};
