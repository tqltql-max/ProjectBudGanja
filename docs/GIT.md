# Git e backups

## Repositório

O projecto usa Git na raiz. A base de dados **não** entra no histórico (`data/` está no `.gitignore`).

```powershell
git status
git add .
git commit -m "descrição da alteração"
```

Copie `.env.example` para `.env` — **nunca** commite `.env`.

## Backup da base de dados

| Comando | Destino |
|---------|---------|
| `npm run db:backup` | `data/backups/budganja-*.db` (dentro do projecto, também ignorado pelo Git) |
| `npm run db:backup:external` | `%USERPROFILE%\BudGanjaBackups\` (fora do repo — recomendado) |

Defina `BUDGANJA_BACKUP_DIR` no `.env` para outro destino.

## Antes de alterações grandes

1. `npm run db:backup:external`
2. `git status`
3. Após editar: `npm run build` (ver [`CHECKLIST-ALTERACOES.md`](CHECKLIST-ALTERACOES.md))
