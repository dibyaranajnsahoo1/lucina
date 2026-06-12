import os
import re

directory = r'd:\lucina-egg-bank\frontend\src\admin\pages'

tables_config = {
    'Blogs.jsx': [['Title', 'Category', 'Author', 'Read Time', 'Status', 'Published', 'Actions']],
    'ContactLeads.jsx': [['Name', 'Email', 'Phone', 'Type', 'Subject', 'Status', 'Date', 'Actions']],
    'Dashboard.jsx': [
        ['Case ID', 'Applicant', 'Status', 'Date'],
        ['Name', 'Email', 'Status', 'Date']
    ],
    'DonorApplications.jsx': [['Case ID', 'Name', 'Email', 'Race', 'Education', 'Files', 'Status', 'Date', 'Actions']],
    'Donors.jsx': [['Photo', 'Donor ID', 'Name', 'Age', 'Race', 'Education', 'Features', 'Availability', 'Active', 'Actions']],
    'FindDonorLeads.jsx': [['Name', 'Email', 'Phone', 'How Heard', 'Needs Surrogate', 'Status', 'Date', 'Actions']],
    'Testimonials.jsx': [['Name', 'Location', 'Rating', 'Text', 'Status', 'Date', 'Actions']]
}

for filename, tables in tables_config.items():
    filepath = os.path.join(directory, filename)
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    parts = content.split('<tbody>')
    if len(parts) - 1 != len(tables):
        print(f'Warning: Mismatch in number of tables for {filename}')
        continue
        
    new_content = parts[0]
    
    for i in range(1, len(parts)):
        tbody_part = parts[i]
        sub_parts = tbody_part.split('</tbody>')
        if len(sub_parts) != 2:
            print(f'Error parsing tbody in {filename}')
            new_content += '<tbody>' + tbody_part
            continue
            
        tbody_inner = sub_parts[0]
        tbody_after = sub_parts[1]
        
        headers = tables[i-1]
        
        td_count = tbody_inner.count('<td')
        if td_count != len(headers):
            print(f'Warning: td count ({td_count}) != headers count ({len(headers)}) in {filename}')
        
        new_tbody_inner = ''
        last_idx = 0
        header_idx = 0
        for match in re.finditer(r'<td', tbody_inner):
            start = match.start()
            new_tbody_inner += tbody_inner[last_idx:start]
            if header_idx < len(headers):
                label = headers[header_idx]
                new_tbody_inner += f'<td data-label=\"{label}\"'
                header_idx += 1
            else:
                new_tbody_inner += '<td'
            last_idx = match.end()
        new_tbody_inner += tbody_inner[last_idx:]
        
        new_content += '<tbody>' + new_tbody_inner + '</tbody>' + tbody_after
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f'Updated {filename}')
