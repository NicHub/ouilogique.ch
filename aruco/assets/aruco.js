/*

Based on https://raw.githubusercontent.com/okalachev/arucogen/master/main.js

Note:
The “dict” variable must be globally loaded from aruco_dict.js before using this script.

*/

"use strict";

var color_1 = "black";
var color_2 = "none";

function generateMarkerSvg(width, height, bits, dict_name, id, size) {
    // TODO: Check if it works if width ≠ height (probably not).
    var px_size_x = size / (width + 2);
    var px_size_y = size / (height + 2);

    var container = document.createElementNS("http://www.w3.org/2000/svg", "g");
    container.setAttribute("class", "aruco");
    // TODO: if ID already exists in document, generate a new one.
    container.setAttribute("id", dict_name + "-" + id);

    // Outer rectangle.
    var outer_rect = document.createElementNS("http://www.w3.org/2000/svg", "path");
    outer_rect.setAttribute("d", "M 0,0 h " + (size) + " v " + (size) + " h " + (-size) + " z m " + (px_size_x) + "," + (px_size_y) + " h" + (size - 2 * px_size_x) + "v " + (size - 2 * px_size_y) + " h " + (-size + 2 * px_size_x) + " v  " + (-size + 2 * px_size_y));
    outer_rect.setAttribute("style", "shape-rendering: crispEdges; stroke-width: 0; fill-rule: evenodd; fill: " + color_1 + ";");
    container.appendChild(outer_rect);

    // Pixels.
    for (var _y = 0; _y < height; _y++) {
        for (var _x = 0; _x < width; _x++) {
            var color = bits[_y * height + _x] ? color_2 : color_1;
            var pixel = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            pixel.setAttribute("x", (_x + 1) * px_size_x);
            pixel.setAttribute("y", (_y + 1) * px_size_y);
            pixel.setAttribute("width", px_size_x);
            pixel.setAttribute("height", px_size_y);
            pixel.setAttribute("style", "shape-rendering: crispEdges; stroke-width: 0; fill: " + color + ";");
            container.appendChild(pixel);
        }
    }

    return container;
}

function generateArucoMarker(width, height, dict_name, id, size) {
    console.log("Generate ArUco marker " + dict_name + " " + id);

    var bytes = dict[dict_name][id];
    var bits = [];
    var bitsCount = width * height;

    // Parse marker’s bytes.
    for (var byte of bytes) {
        var start = bitsCount - bits.length;
        for (var cnt = Math.min(7, start - 1); cnt >= 0; cnt--) {
            bits.push((byte >> cnt) & 1);
        }
    }

    return generateMarkerSvg(width, height, bits, dict_name, id, size);
}

var aruco_types = {
    "4x4_1000": { "data-width": 4, "data-height": 4, "desc": "4x4 (50, 100, 250, 1000" },
    "5x5_1000": { "data-width": 5, "data-height": 5, "desc": "5x5 (50, 100, 250, 1000" },
    "6x6_1000": { "data-width": 6, "data-height": 6, "desc": "6x6 (50, 100, 250, 1000" },
    "7x7_1000": { "data-width": 7, "data-height": 7, "desc": "7x7 (50, 100, 250, 1000" }
};

function aruco(dict_name, marker_id, size, target_elem_id) {
    var width = aruco_types[dict_name]["data-width"];
    var height = aruco_types[dict_name]["data-height"];
    var container = generateArucoMarker(width, height, dict_name, marker_id, size);
    container.setAttribute("transform", "translate(" + (-size / 2) + " " + (-size / 2) + ")");
    document.getElementById(target_elem_id).innerHTML = container.outerHTML;
}
