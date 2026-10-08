const app=document.getElementById('app');
const sidebar=document.getElementById('sidebar');
let users=[{name:'María González',email:'maria.gonzalez@ecolap.co',role:'Administradora'},
    {name:'Carlos Ramírez',email:'carlos.ramirez@ecolap.co',role:'Recolector'},
    {name:'Ana Torres',email:'ana.torres@ecolap.co',role:'Recolector'},
    {name:'Jorge Martínez',email:'jorge.martinez@ecolap.co',role:'Supervisor'}];let current='resumen';
    const title={resumen:'Buenos días, María',usuarios:'Usuarios y roles',recolecciones:'Recolecciones',
        rutas:'Rutas y vehículos',reportes:'Reportes'};
    function button(){return '<button class="primary" id="addUser">+ Agregar usuario</button>'}
    function render(){document.getElementById('pageTitle').textContent=title[current];
        if(current==='usuarios')return usersView();
        if(current==='reportes')return reportsView();
        if(current==='recolecciones'||current==='rutas')return simpleView();
        return dashboard()}function dashboard(){
            app.innerHTML=`<div class="page-head"><div><span class="eyebrow">RESUMEN GENERAL</span><h2>Panel de control</h2><p 
            class="muted">Monitorea el impacto y la operación de tu empresa.</p></div>${button()}</div><div 
            class="cards">${[['Usuarios activos','24','+12.5%'],
                ['Recolecciones del mes','1,284','+8.2%'],
                ['Material reciclado','18.6 t','+15.4%'],
                ['Rutas completadas','96%','+4.1%']].map(x=>`<div class="card"><p>${x[0]}</p><strong>${x[1]}
                    </strong><span class="trend">${x[2]}</span><p>vs. mes anterior</p></div>`).join('')}</div><div 
                    class="grid"><div class="panel"><h3>Recolecciones por mes</h3><p 
                    class="muted">Kilogramos recolectados en 2026</p><div 
                    class="bars">${[55,72,48,80,64,92,70,62,88,76,98,84].map((h,i)=>`<div 
                        class="bar-wrap"><div class="bar" style="height:${h}%"></div><span>${i+1}</span></div>`).
                        join('')}</div></div><div class="panel"><h3>Actividad reciente</h3><p 
                        class="muted">Últimos movimientos del equipo</p><p><b>Carlos Ramírez</b><br><span 
                        class="muted">Registró una nueva recolección · Hace 12 min</span></p><p><b>María González</b><br><span 
                        class="muted">Generó el reporte mensual · Hace 1 h</span></p><p><b>Ana Torres</b><br><span 
                        class="muted">Completó la ruta R-204 · Hace 2 h</span></p></div></div>`;
                        bindAdd()}function usersView(){app.innerHTML=`<div class="page-head"><div><span 
                            class="eyebrow">EQUIPO ECOLAP</span><h2>Usuarios y roles</h2><p 
                            class="muted">Administra los accesos y cargos de tu equipo.</p></div>${button()}</div><div 
                            class="panel"><div class="toolbar"><input 
                            class="search" id="search" placeholder="Buscar usuario..."><span 
                            
                            class="muted">${users.length} usuarios registrados</span></div><div 
                            class="table-wrap"><table 
                            class="table"><thead><tr><th>Usuario</th><th>Cargo</th><th>Estado</th></tr></thead><tbody id="userRows"></tbody></table></div></div>`;
                            drawRows();document.getElementById('search').oninput=drawRows;bindAdd()}function drawRows(){const q=(document.getElementById('search')?.value||'').toLowerCase();
                                document.getElementById('userRows').innerHTML=users.filter(u=>(u.name+u.email+u.role).toLowerCase().includes(q)).map(u=>`<tr><td><b>${u.name}</b><br><small 
                                    class="muted">${u.email}</small></td><td>${u.role}</td><td><span 
                                    class="badge">Activo</span></td></tr>`).join('')}function reportsView(){app.innerHTML=`<div 
                                        class="page-head"><div><span 
                                        class="eyebrow">DATOS PARA DECIDIR MEJOR</span><h2>Reportes</h2><p 
                                        class="muted">Consulta el rendimiento y el impacto ambiental de ECOLAP.</p></div><button 
                                        class="primary" onclick="window.print()">↓ Exportar reporte</button></div><div 
                                        class="report-grid">${[['Material recuperado','18.6 t'],['CO₂ evitado','42.8 t'],['Familias atendidas','846']].map(x=>`<div
                                             class="card"><p>${x[0]}</p><div class="report-value">${x[1]}</div><small
                                              class="muted">Este mes</small></div>`).join('')}</div><div class="panel" style="margin-top:18px"><h3>Distribución por material</h3><p
                                               class="muted">Toneladas recuperadas durante el periodo</p>${[['Plástico','8.4 t',78],
                                                ['Cartón y papel','5.7 t',58],
                                                ['Vidrio','3.1 t',36],
                                                ['Metal','1.4 t',20]].map(x=>`<p><b>${x[0]}</b><span style="float:right">${x[1]}</span></p><div 
                                                    class="progress"><span style="width:${x[2]}%"></span></div>`).join('')}</div>`}function simpleView(){app.innerHTML=`<div class="page-head"><div><span class="eyebrow">OPERACIÓN ECOLAP</span><h2>${title[current]}</h2><p 
                                                    class="muted">Módulo listo para conectar con tu base de datos.</p></div>${button()}</div><div
                                                     class="panel"><h3>Próximamente</h3><p class="muted">Aquí podrás administrar la información de ${current}.</p></div>`;
                                                     bindAdd()}function bindAdd(){document.querySelectorAll('#addUser').forEach(b=>b.onclick=()=>document.getElementById('modal').classList.remove('hidden'))}document.querySelectorAll('.nav-item[data-view]').forEach(b=>b.onclick=()=>{current=b.dataset.view;document.querySelectorAll('.nav-item').forEach(x=>x.classList.remove('active'));
                                                        b.classList.add('active');sidebar.classList.remove('open');
                                                        render()});document.getElementById('openMenu').onclick=()=>sidebar.classList.add('open');
                                                        document.getElementById('closeMenu').onclick=()=>sidebar.classList.remove('open');document.getElementById('closeModal').onclick=()=>document.getElementById('modal').classList.add('hidden');
                                                        document.getElementById('notifications').onclick=()=>document.getElementById('notice').classList.toggle('notice');
                                                        document.querySelector('.modal').onsubmit=e=>{e.preventDefault();const name=document.getElementById('userName').value;users.unshift({name,email:document.getElementById('userEmail').value,role:document.getElementById('userRole').value});
                                                        document.getElementById('modal').classList.add('hidden');e.target.reset();current='usuarios';document.querySelector('[data-view="usuarios"]').click()};render();
