console.log( "=== simpread option siteeditor ===" )

import { storage }  from 'storage';

import Editor       from 'editor';

import Button       from 'button';
import * as tooltip from 'tooltip';
import * as waves   from 'waves';
import * as dia     from 'dialog';

const root   = "simpread-option-root",
      rootjq = `.${root}`;
let site;

/**
 * SiteEditor Rect component
 */
class SiteEditor extends React.Component {

    close() {
        dia.Close();
    }

    delete() {
        console.log( "siteeditor click delete button.", storage.current.site )
    }

    // save siteeditor focus option
    save() {
        console.log( "siteeditor click save button.", storage.current.site, site )
    }

    componentDidMount() {
        waves.Render({ root: rootjq });
        tooltip.Render( rootjq );
    }

    render() {
        site     = { ...storage.current.site };
        site.url = storage.current.url;
        !site.avatar && ( site.avatar = [{ name: "" }, { url: ""  }]);
        !site.paging && ( site.paging = [{ prev: "" }, { next: "" }]);
        return (
            <dia.Dialog>
                <dia.Content>
                    <Editor site={ site } />
                </dia.Content>
                <dia.Footer>
                    <Button text="删 除" waves="md-waves-effect" color="#fff" backgroundColor="#F44336" onClick={ ()=>this.delete() } />
                    <div style={{ width: "100%" }}></div>
                    <Button text="退 出" mode="secondary" waves="md-waves-effect" onClick={ ()=>this.close() } />
                    <Button text="保 存" waves="md-waves-effect" onClick={ ()=>this.save() } />
                </dia.Footer>
            </dia.Dialog>
        )
    }
}

/**
 * Modals Render
 */
function Render() {
    !dia.Popup( rootjq ) && dia.Open( <SiteEditor/>, root );
}

/**
 * Exist
 * 
 * @return {boolean}
 */
function Exist() {
    return dia.Popup( rootjq );
}

/**
 * Exit
 */
function Exit() {
    dia.Close();
}

export{ Render, Exist, Exit }