let textarea = document.getElementById('textarea');
let lineNumbersBtn = document.getElementById('line-numbers-btn');
let preview = document.getElementById('preview');
let setColorBtn = document.getElementById('set-color-btn');
let themeSwitchBtn = document.getElementById('theme-switch-btn');
let fontSwitchBtn = document.getElementById('font-switch-btn');
let fontSizeSwitchBtn = document.getElementById('font-size-switch-btn');
let languageSwitchBtn = document.getElementById('language-switch-btn');
let loader = document.querySelector('.loading');
let openFileBtn = document.getElementById('open-file-btn');

window.onload = function() {
    document.getElementsByClassName("CodeMirror")[0].setAttribute("style", "width: 1250px;");
};

let editor = CodeMirror.fromTextArea(textarea, {
    lineNumbers: true,
    mode: 'php'
});

let lineNumbers = true;

editor.setOption('theme', 'dracula');
editor.setOption('lineNumbers', lineNumbers);


// satır numarasını gizleyip/gösterir
lineNumbersBtn.addEventListener('click', (e) => {
    lineNumbers = !lineNumbers;
    editor.setOption('lineNumbers', lineNumbers);
    if (lineNumbers === false){
        document.getElementsByClassName("CodeMirror-code")[0].setAttribute("style", "padding: 0 15px 15px;");
    }else{
        document.getElementsByClassName("CodeMirror-code")[0].setAttribute("style", "");
    }
});

//arkaplan rengini yarlar
setColorBtn.addEventListener('input', (e) => {
    preview.style.backgroundColor = e.target.value;
});

//temayı yarlar
let oldc = "cm-s-dracula";
themeSwitchBtn.addEventListener('change', (e) => {
    let themeCSS = document.getElementById('theme-css');
    themeCSS.parentNode.removeChild(themeCSS);
    let link = document.createElement('link');
    link.setAttribute('href', 'codemirror/theme/' + e.target.value + '.css');
    link.setAttribute('id', 'theme-css');
    link.setAttribute('rel', 'stylesheet');
    document.querySelector('head').appendChild(link);
    editor.setOption('theme', e.target.value);
    let previewTop = document.querySelector('.preview-top');
    if (oldc.length > 0)
        previewTop.classList.remove(oldc);
    previewTop.classList.add('cm-s-' + e.target.value);
    oldc = 'cm-s-' + e.target.value;
});

//langueage ayarlar
languageSwitchBtn.addEventListener('change', (e) => {
    editor.setOption('mode', e.target.value);
});

//font ayarlar
fontSwitchBtn.addEventListener('change', (e) => {
    document.getElementsByClassName('CodeMirror')[0].setAttribute("style", "font-family:" + e.target.value + ";")
});

//Font boyutu
fontSizeSwitchBtn.addEventListener('change', (e) => {
    document.getElementsByClassName('CodeMirror')[0].setAttribute("style", "font-size:" + e.target.value + ";")
});

//kod adını ayarlar
document.getElementById('set-title').addEventListener('keyup', (e) => {
    title.innerText = e.target.value;
});

//kodu local dosyadan açar
openFileBtn.addEventListener('click', async () => {
    [fileHandle] = await window.showOpenFilePicker();
    let file = await fileHandle.getFile();
    let content = await file.text();
    editor.getDoc().setValue(content);
});

//kodumuzu exportlar
const exportImage = (size) => {
    let opts = {
        allowTaint: true,
        logging: true,
        useCORS: true,
        backgroundColor:null
    };
    preview.style.transform = 'scale('+ size +')';
    loader.style.display = 'flex';
    window.scrollTo(0, 0);
    html2canvas(preview, opts).then(function(canvas) {
        loader.style.display = '';
        preview.style.transform = 'scale(1)';
        let a = document.createElement('a');
        a.setAttribute('download', 'CodeEditor.png');
        a.setAttribute('href', canvas.toDataURL('image/png'));
        a.click();
    });
}