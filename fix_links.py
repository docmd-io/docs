import os
import json

base_dir = '/Users/mac/Workspace/GitHub/docmd-io/docs/docs'

# 1. Delete the files
files_to_delete = [
    'en/guides/search/offline-semantic-search.md',
    'en/guides/search/keyword-vs-semantic.md'
]

for f in files_to_delete:
    p = os.path.join(base_dir, f)
    if os.path.exists(p):
        os.remove(p)
        print(f"Deleted {p}")

# 2. Fix the broken links
replacements = {
    'en/guides/content-ux/task-vs-concept.md': [
        ('[Understanding Identity Management](/concepts/iam)', '[Configuration System](../../configuration/general.md)')
    ],
    'en/guides/content-ux/avoiding-anti-patterns.md': [
        ('(/db-config)', '(../../configuration/general.md)'),
        ('[Database Configuration Guide]', '[General Configuration]')
    ],
    'en/guides/ai-optimisation/context-preservation.md': [
        ('[Network Settings Object](/network)', '[Navigation Array](../../configuration/navigation.md)')
    ],
    'en/guides/ai-optimisation/structure-for-llms.md': [
        ('/diagrams/arch.png', '../../assets/favicon.ico')
    ],
    'en/guides/scaling-architecture/breaking-changes-deprecations.md': [
        ('[Read the v1.x documentation here](/v1.x/configuration)', '[Read the Configuration documentation here](../../configuration/general.md)')
    ],
    'en/guides/scaling-architecture/multi-team-collaboration.md': [
        ('`[Backend DB](/backend/database)`', '`[Configuration](../../configuration/general.md)`')
    ]
}

for path, rep_list in replacements.items():
    full_path = os.path.join(base_dir, path)
    if os.path.exists(full_path):
        with open(full_path, 'r') as file:
            content = file.read()
        for old, new in rep_list:
            content = content.replace(old, new)
        with open(full_path, 'w') as file:
            file.write(content)
        print(f"Fixed links in {full_path}")

# 3. Update navigation.json to remove those two files
langs = ['en', 'de', 'zh']
for lang in langs:
    nav_path = os.path.join(base_dir, lang, 'navigation.json')
    if os.path.exists(nav_path):
        with open(nav_path, 'r') as f:
            nav = json.load(f)
        
        # We need to find the Guides block, then the Search block, and remove those two routes
        def clean_search_block(children):
            for child in children:
                if isinstance(child, dict) and child.get('title') in ['Guides', 'Leitfäden', '指南']:
                    guides = child.get('children', [])
                    for g_child in guides:
                        if isinstance(g_child, dict) and g_child.get('title') == 'Search':
                            search_items = g_child.get('children', [])
                            g_child['children'] = [
                                i for i in search_items 
                                if i.get('path') not in [
                                    '/guides/search/offline-semantic-search',
                                    '/guides/search/keyword-vs-semantic'
                                ]
                            ]
                    break
        
        clean_search_block(nav)
        
        with open(nav_path, 'w') as f:
            json.dump(nav, f, indent=2, ensure_ascii=False)
        print(f"Cleaned navigation.json for {lang}")

