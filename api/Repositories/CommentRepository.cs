using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Comment;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDBContext _context;

        public CommentRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Comment> CreateAsync(Comment model)
        {
            _context.Add(model);
            await _context.SaveChangesAsync();
            return model;
        }

        public async Task<Comment?> DeleteAsync(int id)
        {
            var commentModel = await _context.Comments.FirstOrDefaultAsync(x => x.Id == id);
            if (commentModel == null)
            {
                return null;
            }
            _context.Comments.Remove(commentModel);
            await _context.SaveChangesAsync();

            return commentModel;
        }

        public async Task<List<Comment>> GetAllAsync(CommentQueryObject commentQueryObject)
        {
            var query = _context.Comments.Include(c => c.User).AsQueryable();
            if (!string.IsNullOrWhiteSpace(commentQueryObject.Symbol))
            {
                query = query.Where(s => s.Stock.Symbol == commentQueryObject.Symbol);
            }
            if (commentQueryObject.IsDescending == true)
            {
                query = query.OrderByDescending(s => s.CreatedOn);
            }
            return await query.ToListAsync();
        }

        public async Task<Comment?> GetByIdAsync(int id)
        {
            var comment = await _context.Comments.Include(c => c.User).FirstOrDefaultAsync(c => c.Id == id);
            if (comment == null)
            {
                return null;
            }
            return comment;
        }

        public async Task<Comment?> UpdateAsync(int id, CreateOrUpdateCommentDto model)
        {
            var existingComment = await _context.Comments.FirstOrDefaultAsync(x => x.Id == id);
            if (existingComment == null)
            {
                return null;
            }
            existingComment.Content = model.Content;
            existingComment.Title = model.Title;
            await _context.SaveChangesAsync();

            return existingComment;
        }
    }
}