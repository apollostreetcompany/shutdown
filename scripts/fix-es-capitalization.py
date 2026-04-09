#!/usr/bin/env python3
"""
Fix overcapitalization and standardize guide_includes in the Spanish (es)
fields of all state JSON files.

Opus found that the Sonnet translation incorrectly carried over English
capitalization conventions (Board of Directors, Shareholders, etc.) into
Spanish, where only proper nouns are capitalized.
"""

import json
import os
import glob

DATA_DIR = '/Users/future/dev/shutdown/data/states'

# Canonical guide_includes (standardized by Opus)
CANONICAL_GUIDE_INCLUDES = [
    "Lista de verificación de disolución paso a paso",
    "Todos los formularios requeridos con enlaces de descarga directa",
    "Tabla de tarifas completa",
    "Requisitos y proceso de liquidación fiscal",
    "Cronograma con opciones de procesamiento acelerado",
    "Plantillas de notificación para acreedores y empleados",
    "Lista de verificación de cumplimiento post-disolución"
]

# Overcapitalization fixes: article + capitalized noun → article + lowercase noun
# These are safe because "el/la/los/las/del/al/un/una" never start a Spanish sentence.
OVERCAP_FIXES = [
    ('los Accionistas', 'los accionistas'),
    ('las Accionistas', 'las accionistas'),
    ('los Miembros', 'los miembros'),
    ('la Junta Directiva', 'la junta directiva'),
    ('el Agente Registrado', 'el agente registrado'),
    ('del Agente Registrado', 'del agente registrado'),
    ('al Agente Registrado', 'al agente registrado'),
    ('un Agente Registrado', 'un agente registrado'),
    ('los Acreedores', 'los acreedores'),
    ('las Acreedores', 'las acreedores'),
    ('la Corporación', 'la corporación'),
    ('una Corporación', 'una corporación'),
    ('de la Corporación', 'de la corporación'),
    ('el Acuerdo Operativo', 'el acuerdo operativo'),
    ('del Acuerdo Operativo', 'del acuerdo operativo'),
    ('al Acuerdo Operativo', 'al acuerdo operativo'),
    ('un Acuerdo Operativo', 'un acuerdo operativo'),
    ('la Disolución', 'la disolución'),
    ('de la Disolución', 'de la disolución'),
    ('de Disolución', 'de disolución'),
    ('la Cancelación', 'la cancelación'),
    ('de Cancelación', 'de cancelación'),
    ('la Presentación', 'la presentación'),
    ('de Presentación', 'de presentación'),
    ('una Presentación', 'una presentación'),
    ('la Notificación', 'la notificación'),
    ('las Notificaciones', 'las notificaciones'),
    ('una Notificación', 'una notificación'),
    ('el Procesamiento', 'el procesamiento'),
    ('del Procesamiento', 'del procesamiento'),
    ('de Procesamiento', 'de procesamiento'),
    ('la Terminación', 'la terminación'),
    ('la Liquidación Fiscal', 'la liquidación fiscal'),
    ('de Liquidación Fiscal', 'de liquidación fiscal'),
    ('la Cancelación', 'la cancelación'),
    ('los Formularios', 'los formularios'),
    ('el Formulario', 'el formulario'),
    ('los Artículos', 'los artículos'),
    ('el Certificado', 'el certificado'),
    ('del Certificado', 'del certificado'),
    # Verb-related overcaps
    ('la Junta', 'la junta'),
    ('la Resolución', 'la resolución'),
    ('los Estatutos', 'los estatutos'),
]

# Verb form fixes: imperative → infinitive at start of step strings
# Only applied when the word is at the very beginning of a string (step/sentence-start)
IMPERATIVE_TO_INFINITIVE = [
    ('Vote ', 'Votar '),
    ('Presente ', 'Presentar '),
    ('Obtenga ', 'Obtener '),
    ('Realice ', 'Realizar '),
    ('Cancele ', 'Cancelar '),
    ('Adopte ', 'Adoptar '),
    ('Apruebe ', 'Aprobar '),
    ('Pague ', 'Pagar '),
    ('Espere ', 'Esperar '),
    ('Notifique ', 'Notificar '),
    ('Distribuya ', 'Distribuir '),
    ('Complete ', 'Completar '),
    ('Disuelva ', 'Disolver '),
    ('Confirme ', 'Confirmar '),
    ('Liquide los', 'Liquidar los'),
    ('Liquide las', 'Liquidar las'),
    ('Liquide el', 'Liquidar el'),
    ('Envíe ', 'Enviar '),
    ('Envie ', 'Enviar '),
    ('Registre ', 'Registrar '),
]


def fix_string(s):
    """Apply all fixes to a single string."""
    # Overcapitalization (applied anywhere in string)
    for old, new in OVERCAP_FIXES:
        s = s.replace(old, new)
    return s


def fix_step_string(s):
    """Apply fixes including verb form fixes (start-of-string only)."""
    s = fix_string(s)
    # Verb form fixes: only at start of string
    for old, new in IMPERATIVE_TO_INFINITIVE:
        if s.startswith(old):
            s = new + s[len(old):]
            break
    return s


def fix_es_object(es_obj):
    """Recursively fix the es object."""
    result = {}
    for key, val in es_obj.items():
        if key == 'guide_includes':
            result[key] = CANONICAL_GUIDE_INCLUDES
        elif key in ('llc_steps', 'corp_steps'):
            result[key] = [fix_step_string(step) for step in val] if isinstance(val, list) else val
        elif isinstance(val, str):
            result[key] = fix_string(val)
        elif isinstance(val, list):
            result[key] = [fix_string(item) if isinstance(item, str) else item for item in val]
        else:
            result[key] = val
    return result


def main():
    state_files = sorted(
        f for f in glob.glob(os.path.join(DATA_DIR, '*.json'))
        if not f.endswith('index.json')
    )

    fixed = 0
    skipped = 0

    for path in state_files:
        code = os.path.basename(path).replace('.json', '')
        with open(path, encoding='utf-8') as f:
            data = json.load(f)

        if 'es' not in data:
            print(f'  SKIP {code}: no es field')
            skipped += 1
            continue

        original_es = json.dumps(data['es'], ensure_ascii=False, sort_keys=True)
        data['es'] = fix_es_object(data['es'])
        new_es = json.dumps(data['es'], ensure_ascii=False, sort_keys=True)

        if original_es != new_es:
            with open(path, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            print(f'  FIXED {code}')
            fixed += 1
        else:
            print(f'  OK    {code}')

    print(f'\n✓ Fixed {fixed} files, {skipped} skipped, {len(state_files) - fixed - skipped} already clean')


if __name__ == '__main__':
    main()
