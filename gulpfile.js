"use strict"

const process = require("child_process")
    , fs = require("fs")
    , os = require("os")
    , path = require("path")

const gulp = require("gulp")
    , postcss = require("gulp-postcss")
    , autoprefixer = require("gulp-autoprefixer")
    , concat = require("gulp-concat")
    , connect = require("gulp-connect")
    , plumber = require("gulp-plumber")

const processors = process
    .execSync("npm ls --parseable --depth=0 --dev")
    .toString()
    .split(os.EOL)
    .map(module => path.basename(module))
    .filter(name => name.startsWith("postcss"))
    .sort((a,b) =>
    {
        if (a == 'postcss-import') return -1
        if (b == 'postcss-nested-props' && a == 'postcss-nested') return 1
        return a > b
    })
    .map(require)

const SERVER_ROOT = "./"
    , SERVER_PORT = 8080

const GLOB_CSS = "styles/**/*.css"
    , GLOB_HTML = "*.html"

gulp.task("html", () =>
{
    gulp.src(GLOB_HTML)
        .pipe(connect.reload())
})

gulp.task("css", () =>
{
    gulp.src(GLOB_CSS)
        .pipe(plumber())
        .pipe(postcss(processors))
        .pipe(autoprefixer())
        .pipe(gulp.dest("style"))
        .pipe(connect.reload())
})

gulp.task("watch", () =>
{
    gulp.watch(GLOB_HTML, [ "html" ])
    gulp.watch(GLOB_CSS, [ "css" ])

})

gulp.task("serve", () =>
{
    connect.server
    ({
        root: SERVER_ROOT,
        port: SERVER_PORT
    })
})

gulp.task("reload", () =>
{
    connect.server
    ({
        root: SERVER_ROOT,
        port: 9090,
        livereload: true
    })
})

gulp.task("compile", [ "css" ])
    .task("default", [ "compile" ])
    .task("dev", [ "reload", "compile", "watch" ])
    .task("start", [ "dev", "open" ])